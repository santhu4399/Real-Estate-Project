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
  var email = req.body.email.trim();
  var password = req.body.password.trim();
  req.check("email", "Enter a valid email address.").isEmail();
  req.check('password', 'Password Incorrect').len(8, 30);
  var error = [];
  var errors = req.validationErrors();
        if (errors) {
          res.render('login',{error:errors,user:true,agent:false,admin:false,reg:false,success:''});
        }else {
        userManagement.userLogin(email, password, function(callback){
          if (callback == true) {
            // res.send("login success....");
            var data = {
              "userName" : "Prix Werkz",
              "date" : "13/09/2017",
              "tatalSaleToday" : 100,
              "thisMonthSale": 800,
              "totalSale" : 5000,
              "presentStock" : 10000,
            };
            res.render('userDashboard',{data:data});
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
    var firstname = req.body.firstname.trim();
    var lastname = req.body.lastname.trim();
    var email = req.body.email.trim();
    var phno = req.body.phno.trim();
    var address = req.body.address.trim();
    var security_question = req.body.security_question.trim();
    var security_answer = req.body.security_answer.trim();
    var password = req.body.password.trim();
    var conformpassword = req.body.conformpassword.trim();
    req.check("firstname", "Firstname can not be empty").notEmpty();
    req.check("lastname", "Lastname can not be empty").notEmpty();
    req.check("email", "Enter a valid email address").isEmail();
    req.check("phno", "Enter a valid 10 digit mobile number").matches(/^\d{10}/g);
    req.check("security_question", "select a security question").notEmpty();
    req.check("security_answer", "security answer must be minimum 10 characters in length").matches(/.{10}/g);
    req.check('password', 'pasword length should be minimum 8 characters').notEmpty().len(8, 30);
    req.check('password', 'passwords does not match with conform field').equals(conformpassword);
    var error = [];
    if (!firstname || !lastname || !email || !phno || !address || !security_question || !security_answer || !password) {
            error.push({msg:'Fields cann\'t be empty'});
            res.render('login',{error:error,user:false,agent:false,admin:false,reg:true,success:''});
    }
    var errors = req.validationErrors();
    if (errors) {
      res.render('login',{error:errors,user:false,agent:false,admin:false,reg:true,success:''});
    }else {
        userManagement.newUserRegistration(firstname, lastname, email, phno, address, security_question, security_answer, password,function(callback){
          console.log(callback);
          res.send(callback);
        });
      }
});
// New User Registration Router ends
// forgot password router starts
router.post('/forgotPassword', function(req, res){
  var email = req.body.email.trim();
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
    var id = req.body.id.trim();
    var email = req.body.email.trim();
    var phno = req.body.phno.trim();
    var security_question = req.body.security_question.trim();
    var security_answer = req.body.security_answer.trim();
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
  var id = req.body.id.trim();
  var email = req.body.email.trim();
  var password = req.body.password.trim();
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
  var id = req.body.id.trim();
  var firstname = req.body.firstname.trim();
  var lastname = req.body.lastname.trim();
  var email = req.body.email.trim();
  var phno = req.body.phno.trim();
  var address = req.body.address.trim();
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
