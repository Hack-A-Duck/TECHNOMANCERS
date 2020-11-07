let express= require("express");
let cors= require("cors");
let cookieParser= require("cookie-parser");
let userRouter = require("./router/userRouter")
let productRouter = require("./router/productRouter")
let orderRouter = require("./router/orderRouter");
let cartRouter = require("./router/cartRouter")
let app= express();

app.use(cors({origin: true, credentials: true}));

app.use(cookieParser());

app.use(express.static("./public"));

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/cart", cartRouter);
app.get("/check",(req, res, next)=>{
    res.status(200).json({
        status: "success"
    })
})


// express error handler middleware
app.use((err,req,res,next)=>{
    console.log(err);
    res.status(500).json({
        status: "fail",
        message: err.message
    })
})

module.exports= app;