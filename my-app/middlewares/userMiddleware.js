const myLogger = (req,res,next) => {
    req.time = new Date();
    console.log('This is my logger middleware function');
    next();
}

module.exports = {
    myLogger
}