let DB = require("./../server");
const { returnErr } = require("../utils/error");
let multer= require("multer");
let cloudinary= require("./../utils/cloudinaryConfig");

const multerStorage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/img/items");
    },
    filename:(req,file,cb)=>{
        //user-1234567gh6789-23456778.jpeg
        const type=file.mimetype.split("/")[1];
        const id=req.currentUser.id;
        cb(null,`item-${id}-${Date.now()}.${type}`);
    }
})

const multerFilter=(req,file,cb)=>{
    if(file.mimetype.startsWith("image"))
        cb(null,true);
    else
        cb(new Error("Not an image. Please upload only images"),false);
}

const upload= multer({
    storage: multerStorage,
    fileFilter: multerFilter
})

exports.uploadProductPhotos= upload.fields([
    { name: "images", maxCount: 10},
    { name: "cover_image", maxCount: 1}
]);

exports.getProducts = (req,res,next)=>{
    let Q;
    Q = "select cover_image, id, category, price, discount, name from products order by created_at";
    if(req.query.category){
        Q = `select cover_image, id, category, price, discount, name from products where category='${req.query.category.toLowerCase()}' order by created_at`
    }
    DB.query(Q, (err, result, fields)=>{
        if(err) returnErr(err,500, res);
        else{
            res.status(200).json({
                status: "success",
                data: result
            })
        }
    })
}

exports.createProduct = (req, res, next)=>{

    if(req.files.images){
        req.body.images=req.files.images.map(el=>{
            return process.env.NODE_ENV=="development"?`http://127.0.0.1:5000/img/items/${el.filename}`:`https://goodifie.herokuapp.com/img/items/${el.filename}`;
        })

        req.body.images= req.body.images.join("$!end!$");
    }

    if(req.files.cover_image){
        req.body.cover_image= process.env.NODE_ENV=="development"?`http://127.0.0.1:5000/img/items/${req.files.cover_image[0].filename}`:`https://goodifie.herokuapp.com/img/items/${req.files.cover_image[0].filename}`;
    }


    const product = {
        shopkeeper_id: req.currentUser.id,
        name: req.body.name,
        category: req.body.category.toLowerCase(),
        price: req.body.price * 1,
        images: req.body.images,
        cover_image: req.body.cover_image,
        discount: req.body.discount * 1,
        description: req.body.description
    }
    const Q= "insert into products set ?";
    DB.query(Q, product, (err, result)=>{
        if(err) returnErr(err, 400, res);
        else{     
            cloudinary.uploads(req.files.cover_image[0].path, result.insertId).then(result1=>{
                console.log(result1.url);
                DB.query("update products set cover_image=? where id=?", [result1.url, result1.blog_id]);
            })   
            res.status(201).json({
                status: "success",
                data: product
            })
        }
    })
}


exports.getProductDetails = (req, res, next)=>{
    const Q = "select * from products where id=?;";
    DB.query(Q, req.params.id, (err, result, fields)=>{
        if(err) returnErr(err, 400, res);
        else{
            if(!result[0].id)
                returnErr(new Error("invalid id!", 400,res));
            else{
            DB.query(`select cover_image, id, category, price, name, discount from products where category='${result[0].category}' and id!='${result[0].id}' order by created_at limit 5`, (err, res1)=>{
                if(err) returnErr(err, 400, res);
                else{
                    res.status(201).json({
                        status: "success",
                        data: {
                            ...result[0],
                            images: result[0].images?result[0].images.split("$!end!$"): null,
                            similarItems: res1
                        }
                    })
                }
            })
            }        
        }
    })
}