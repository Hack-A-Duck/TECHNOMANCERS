let DB = require("./../server");
let {returnErr} = require("./../utils/error");

exports.createOrder = (req, res, next)=>{

    let userOrders = req.body.orders;
    console.log(userOrders);

    let orders = userOrders.map(el => {
        return [req.currentUser.id, el.product_id, el.address, el.pincode, el.city];
    });

    const Q = "insert into orders(user_id, product_id, address, pincode, city) values ?";

    DB.query(Q, [orders], (err, result)=>{
        if(err) returnErr(err, 400, res);
        else{
            DB.query("delete from cart where user_id = ?", req.currentUser.id, (err, result1, fields)=>{});
            res.status(201).json({
                status: "success",
                orders
            })
        }
    })
}

exports.getYourOrders = (req, res, next)=>{
    const Q = "select orders.id as id, order_date, address, pincode, city, price, discount, name, category, product_id, cover_image from orders join products on products.id=orders.product_id where user_id=? order by order_date desc"
    DB.query(Q, req.params.id, (err, result, fields)=>{
        if(err) returnErr(err, 400, res);
        else{
            res.status(201).json({
                status: "success",
                data: result
            })
        }
    })
}