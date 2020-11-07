let express= require("express");
let router= express.Router();
let authentication = require("./../controller/authentication");
let cartController = require("./../controller/cartController");

router.post("/", authentication.protect, cartController.addItem);
router.delete("/:id", authentication.protect, cartController.deleteItem);
router.get("/:user_id", authentication.protect, cartController.getItemsByUser);

module.exports= router;
