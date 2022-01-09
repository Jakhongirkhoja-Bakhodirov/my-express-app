const logOriginalUrl = (req,res,next) => {
    console.log('Request URL' , req.originalUrl);
    next();
}

const logMethod = (req,res,next) => {
    console.log('Request Type' , req.method);
    next();
}

const logUrlDetails = [logMethod , logOriginalUrl];

module.exports = logUrlDetails;