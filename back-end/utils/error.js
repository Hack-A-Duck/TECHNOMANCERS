exports.returnErr= (err, status, res)=>{
    res.status(status).json({
        status: "fail",
        message: err.message
    });
}