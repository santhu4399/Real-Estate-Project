var express = require('express');
var userManagement = require('../controllers/userManagement');
var router = express.Router();

router.get('/',function(req,res){
  // var index = fs.readFileSync('./first.html');
  // res.end(index);
  res.sendFile('users.html',{root:'./'})
});

//Login Router starts
router.post('/login',function(req, res){
  console.log(req.body);
  var email = req.body.email;
  var password = req.body.password;
    if (!email || !password) {
            res.redirect('/');
    }
    else {
        userManagement.userLogin(email, password, function(callback){
          if (callback == true) {
            res.send("login success....");
          }
          else {
            console.log(callback);
            res.redirect('/');
          }
        });
    }
});
//Login Router ends
// New User Registration Router starts
router.post('/newUserRegistration', function(req, res){
    console.log(req.body);
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var phno = req.body.phno;
    var address = req.body.address;
    var security_question = req.body.security_question;
    var security_answer = req.body.security_answer;
    var password = req.body.password;
    if (!firstname || !lastname || !email || !phno || !address || !security_question || !security_answer || !password) {
            res.redirect('/');
    }
    else {
    userManagement.newUserRegistration(firstname, lastname, email, phno, address, security_question, security_answer, password,function(callback){
      console.log(callback);
      res.send(callback);
    });
    }
});
// New User Registration Router ends
// forgot password router starts
router.post('/forgotPassword', function(req, res){
  var email = req.body.email;
  if (!email) {
    res.redirect('/');
  }else {
    userManagement.forgotPassword(email,function(callback){
      if (callback[0] === true) {
        console.log("email varified...redirecting");
        res.send(callback);
      }else {
        console.log(callback);
        res.redirect('/');
      }
    });
  }
});
// forgot password router ends
// recover password router starts
router.post('/recoverPassword', function(req, res){
    console.log(req.body);
    var id = req.body.id;
    var email = req.body.email;
    var phno = req.body.phno;
    var security_question = req.body.security_question;
    var security_answer = req.body.security_answer;
    if (!id || !email ||!phno || !security_question || !security_answer) {
      res.redirect('/');
    }
    else {
      userManagement.recoverPassword(id, email, phno, security_question, security_answer,function(callback){
        if (callback[0] === true) {
          res.send(callback);
        }else {
          console.log(callback);
          res.redirect('/');
        }
      });
    }
});
// recover password router ends
// reset password router starts
router.post('/resetPassword', function(req, res){
  var id = req.body.id;
  var email = req.body.email;
  var password = req.body.password;
  if (!id || !email || !password) {
    res.redirect('/');
  }else {
    userManagement.resetPassword(id, email, password, function(callback){
      if (callback === true) {
        res.send("password Reset successful.......");
      }else {
        console.log(callback);
        res.redirect('/');
      }
    });
  }
});
// reset password router ends
//update user Information route starts
router.post('/updateProfile', function(req, res){
  console.log(req.body);
  var id = req.body.id;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var email = req.body.email;
  var phno = req.body.phno;
  var address = req.body.address;
  if (!id || !firstname || !lastname || !email || !phno || !address) {
          res.redirect('/');
  }
  else {
  userManagement.editUserInformation(id, firstname, lastname,email, phno, address, function(callback){
    if (callback === true) {
      res.send("successfully Updated user Information .......");
    }else {
      console.log(callback);
      res.redirect('/');
    }
  });
  }
});


module.exports = router;
