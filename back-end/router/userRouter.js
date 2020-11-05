let express= require("express");
let router= express.Router();
let authentication= require("./../controller/authentication");
const { getUsers, me } = require("../controller/userController");

router.post("/signup",authentication.hashPassword, authentication.signup);
router.post("/signin", authentication.signin);
router.get("/logout", authentication.logout);

router.patch("/update_password", authentication.protect, authentication.hashPassword, authentication.updatePassword);

router.get("/",authentication.protect,authentication.restrictTo("admin"), getUsers);

router.get("/me", authentication.protect, me);

module.exports= router;