const cookieValidator = (async(cookies) => {
    try {
        await externallyValidateCookie(cookies);
    } catch (err) {
        throw new Error('Invalid cookies' , err.message);
    }
});

const validateCookie = async(req,res,next) => {
    await cookieValidator(req.cookies);
    next();
}

module.exports = {
    validateCookie,
    cookieValidator
}