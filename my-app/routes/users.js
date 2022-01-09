var express = require('express');
const { route } = require('.');
const logUrlDetails = require('../middlewares/routeMiddleware');
var router = express.Router();

/* GET users listing. */

//Route methods
router.get('/', function(req, res, next) {
  const currentTime = new Date();
  const remainTime = currentTime.getTime() - req.time.getTime();
  res.send(`respond with a resource ${remainTime} ms`);
});

router.all('/methods' , (req,res,next) => {
  console.log('Access all type of method' , req.method);
  if(req.method == 'GET' || req.method == 'POST' || req.method == 'DELETE' || req.method == 'PATCH' || req.method == 'PUT') {
    res.status(200).json({
      status:true,
      message:`Calling ${req.method} method`
    });
  } else {
    res.status(404).json({
      status:false,
      message:`Not found ${req.method} method`
    });
  }
});


//Route Params
router.get('/:userID/books/:bookID' , logUrlDetails , (req,res) => {
    res.status(200).json({
      status:true,
      data:req.params
    });
});

//Route Handlers

//an array of callback functions can handle a route
const findUser = (req,res,next) => {
  console.log('this is findUser method');
  next();
}

const checkUser = (req,res,next) => {
  console.log('this is checkUser method');
  next();
}

const sendDataToUser = (req,res) => {
  console.log('this is sendDataToUser method');
  res.status(200).json({
    status:true,
    message:'Using array of callback functions a single route'
  });
}

router.get('/callbacks' , [findUser , checkUser , sendDataToUser]);

//Response Methods
//res.download()
//Note:	Prompt a file to be downloaded

router.post('/download/photo' , (req,res) => {
  res.download(`${__dirname}/../public/images/twitter-app.png` , (err) => {
    res.status(404).json({
      status:false,
      message:err
    });
  });
});

// Method	Description
// res.download()	Prompt a file to be downloaded.
// res.end()	End the response process.
// res.json()	Send a JSON response.
// res.jsonp()	Send a JSON response with JSONP support.
// res.redirect()	Redirect a request.
// res.render()	Render a view template.
// res.send()	Send a response of various types.
// res.sendFile()	Send a file as an octet stream.
// res.sendStatus()	Set the response status code and send its string representation as the response body.

module.exports = router;
