let DB = require("./../server");
let {returnErr} = require("./../utils/error");

exports.createOrder = (req, res, next)=>{
    const order = {
        user_id: req.currentUser.id,
        product_id: req.body.product_id,
        address: req.body.address,
        pincode: req.body.pincode,
        city: req.body.city
    }

    const Q = "insert into orders set ?";

    DB.query(Q, order, (err, result)=>{
        if(err) returnErr(err, 400, res);
        else{
            res.status(201).json({
                status: "success",
                order
            })
        }
    })
}

exports.getYourOrders = (req, res, next)=>{
    const Q = "select * from orders join products on products.id=orders.user_id where user_id=?"
    DB.query(Q, req.params.id, (err, result, fields)=>{
        if(err) returnErr(err, 400, res);
        else{
            res.status(201).json({
                status: "success",
                orders: result
            })
        }
    })
}