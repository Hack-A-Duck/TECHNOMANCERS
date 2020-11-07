let jwt= require("jsonwebtoken");
let bcrypt = require("bcrypt");
let DB = require("./../server");
let {returnErr} = require("./../utils/error");

exports.hashPassword= async (req,res,next)=>{
    if(req.body.password!==req.body.confirmPassword){
        returnErr(new Error("Password and Confirmed password must be same"), 400, res);
        return;
    }
    req.body.password= await bcrypt.hash(req.body.password, 10);
    next();
}

let comparePassword= async (password, real_password)=>{
    return await bcrypt.compare(password, real_password);
}

let signToken = email=>{
    return jwt.sign({email}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

let sendJwtToken = (user, res, status)=>{
    const token = signToken(user.email);
    delete user.password;

    const COOKIE_OPTIONS= {
        expires: new Date(Date.now() + (process.env.COOKIE_EXPIRES*24*60*60*1000)),
        httpOnly: true
    }
    if(process.env.NODE_ENV=="production"){
        COOKIE_OPTIONS.sameSite= "None";
        COOKIE_OPTIONS.secure= true;
    }
    res.cookie("jwt", token, COOKIE_OPTIONS);
    res.status(status).json({
        status: "success",
        data: user,
        token
    })
}



exports.signup= (req,res,next)=>{
    let user= {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        number: req.body.number
    }
    const Q="insert into users set ?";
    DB.query(Q, user, (err, result, fields)=>{
        if(err) returnErr(err, 400, res);
        else{
            sendJwtToken(user, res, 201);
        }
    });
}

exports.signin= (req, res, next)=>{
    let Q="select id,name,email, password, number from users where email= ?";
    DB.query(Q, req.body.email, async (err, result, fields)=>{
        if(err) returnErr(err, 500, res);

        else if(result.length === 0)
            returnErr(new Error("email not exist..."), 404, res);

        else{
            if(await comparePassword(req.body.password, result[0].password))
                sendJwtToken({name: result[0].name, email: result[0].email, number: result[0].number, id: result[0].id}, res, 200);
            else
                returnErr(new Error("incorrect password!!!"), 404, res);
        }
    });
}

exports.protect= (req, res, next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
        token= req.headers.authorization.split(" ")[1];
    else if(req.cookies.jwt)
        token= req.cookies.jwt;
    if(!token){
        returnErr(new Error("You are not looged in, Please login first"),401, res);
    }
    else{
        jwt.verify(token, process.env.JWT_SECRET, (err, data)=>{
            if(err) returnErr(new Error("invalid token!!"), 401, res);
            else{
                const Q= "select id, email, name, password_changed_at, role from users where email=?";
                DB.query(Q, data.email, (err, result, fields)=>{
                    if(err) returnErr(new Error("invalid token, please login..."), 401, res);
                    else{
                        if(result[0].password_changed_at && data.iat*1000 < new Date(result[0].password_changed_at).getTime())
                            returnErr(new Error("You changed your password. Please login again"), 401, res);
                        else{
                            req.currentUser= result[0];
                            next();
                        }
                    }
                })
            }
        })
    }
}


exports.updatePassword= async (req, res, next)=>{
    if(!req.currentUser)
        returnErr(new Error("You are not logged in."), 401, res);
    else{
        const Q1= "select password from users where email=?";
        DB.query(Q1, req.currentUser.email,async (err1, result1, fields1)=>{
            if(err1) returnErr(new Error("user not exist"), 404, res);
            else if(await comparePassword(req.body.old_password, result1[0].password)){
                const Q= "update users set password = ?, password_changed_at=? where email= ?"
                DB.query(Q, [req.body.password, new Date(), req.currentUser.email], (err,result, fields)=>{
                    if(err) returnErr(new Error("something went wrong!!!"), 404, res);
                    else{
                        res.status(200).json({
                            status: "success"
                        })
                    }
                })
            }
            else{
                returnErr(new Error("incorrect current password!!!"), 401, res);
            }
        })
    }
}

exports.restrictTo= (...roles)=>{
    return (req, res, next)=>{
        if(roles.includes(req.currentUser.role))
                    next();
        else{
            res.status(403).json({
                status: "fail",
                message: "You are not authorized to access this route"
            })
        }
    }
}

exports.checkUser= (req,res, next)=>{
    if(!req.cookies.jwt)
        next();
    else{
        let token = req.cookies.jwt;
        jwt.verify(token, process.env.JWT_SECRET, (err, data)=>{
            if(err) next();
            else{
                const Q= "select id, email, name, password_changed_at, role from users where email=?";
                DB.query(Q, data.email, (err, result, fields)=>{
                    if(err) next();
                    else{
                        if(result[0].password_changed_at && data.iat*1000 < new Date(result[0].password_changed_at).getTime())
                            next();
                        else{
                            req.currentUser= result[0];
                            next();
                        }
                    }
                })
            }
        })
    }
}

exports.logout= (req,res, next)=>{

    const COOKIE_OPTIONS= {
        expires: new Date(Date.now() + 2000),
        httpOnly: true
    }
    if(process.env.NODE_ENV=="production"){
        COOKIE_OPTIONS.sameSite= "None";
        COOKIE_OPTIONS.secure= true;
    }
    res.cookie("jwt", "cookie expired", COOKIE_OPTIONS);
    res.status(200).json({
        status: "success"
    })
}