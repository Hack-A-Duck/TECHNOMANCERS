let DB =require("./../server");
const { returnErr } = require("../utils/error");

exports.getUsers= (req,res,next)=>{
    console.log(DB._allConnections.length);
    DB.query("select id, name, email, created_at from users", (err,result, fields)=>{
        if(err) returnErr(err,500, res);
        else{
            res.status(200).json({
                status: "success",
                data: result
            })
        }
    })
}

exports.me= (req,res,next)=>{
    DB.query("select id,name, email, role, number from users where id=?;select * from products where shopkeeper_id=?", [req.currentUser.id,req.currentUser.id], (err, result, fields)=>{
        if(err) returnErr(err, 500, res);
        else{
            res.status(200).json({
                status: "success",
                data: {user: result[0][0], products: result[1]}
            })
        }
    });
}