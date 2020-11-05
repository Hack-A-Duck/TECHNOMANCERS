let express= require("express");
let router= express.Router();
let authentication = require("./../controller/authentication");
let orderController = require("./../controller/orderController");

router.post("/", authentication.protect, orderController.createOrder);

router.get("/your_orders/:id", authentication.protect, orderController.getYourOrders);

module.exports = router;