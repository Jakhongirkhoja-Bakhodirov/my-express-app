const myLogger = (req,res,next) => {
    req.time = new Date();
    console.log('This is my logger middleware function');
    next();
}

const getUserID = (req,res,next) => {
    // if the user ID is 0, skip to the next route
    if(req.params.id === '0') next('route'); 
    
    // otherwise pass the control to the next middleware function in this stack
    else {
        console.log('Request type', req.method);
        console.log('Request params' , req.params);
        next()
    };
}

module.exports = {
    myLogger,
    getUserID
}