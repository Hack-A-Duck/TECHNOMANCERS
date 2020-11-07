let DB = require("./../server");
let { returnErr } = require("./../utils/error");

exports.addItem= (req, res, next)=>{
    const Q = "insert into cart set ?";
    const item = {
        user_id: req.currentUser.id,
        product_id: req.body.product_id * 1
    }

    DB.query(Q, item, (err, result)=>{
        if(err) returnErr(err, 400, res);
        else{
            res.status(200).json({
                status: "success",
                data: item
            })
        }
    })
}

exports.getItemsByUser= (req, res, next)=>{
    const Q= "select cart.id as id, product_id, user_id, cover_image, category, price, discount, name from cart join products on cart.product_id=products.id where cart.user_id=?";
    DB.query(Q, req.params.user_id, (err, result, fields)=>{
        if(err) returnErr(err, 404, res);
        else{
            res.status(200).json({
                status: "success",
                data: result
            })
        }
    })
}

exports.deleteItem= (req, res, next)=>{
    const Q = "delete from cart where id=?";
    DB.query(Q, req.params.id, (err, result, fields)=>{
        if(err) returnErr(err, 400, res);
        else{
            res.status(200).json({
                status: "success"
            })
        }
    })
}