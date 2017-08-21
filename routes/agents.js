var express = require('express');
var agentManagement = require('../controllers/agentManagement');
var router = express.Router();

//Login Router starts
router.post('/login',function(req, res){
  console.log(req.body);
  var email = req.body.email;
  var password = req.body.password;
    if (!email || !password) {
            res.redirect('/');
    }
    else {
        agentManagement.agentLogin(email, password, function(callback){
          if (callback == true) {
            res.send("login success....");
          }
          else {
            console.log(callback);
            res.send(callback)
            // res.redirect('/');
          }
        });
    }
});
//Login Router ends
// New Agent Registration Router starts
router.post('/newAgentRegistration', function(req, res){
    console.log(req.body);
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var company = req.body.company;
    var email = req.body.email;
    var phno = req.body.phno;
    var address = req.body.address;
    var security_question = req.body.security_question;
    var security_answer = req.body.security_answer;
    var password = req.body.password;
    if (!firstname || !lastname || !company || !email || !phno || !address || !security_question || !security_answer || !password) {
            res.redirect('/');
    }
    else {
    agentManagement.newAgentRegistration(firstname, lastname,company, email, phno, address, security_question, security_answer, password,function(callback){
      console.log(callback);
      res.send(callback);
    });
    }
});
// New Agent Registration Router ends
// forgot password router starts
router.post('/forgotPassword', function(req, res){
  var email = req.body.email;
  if (!email) {
    res.redirect('/');
  }else {
    agentManagement.forgotPassword(email,function(callback){
      if (callback[0] === true) {
        console.log("email varified....redirecting");
        res.send(callback);
      }else {
        console.log(callback);
        res.send("invalid emailid........")
        // res.redirect('/');
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
      agentManagement.recoverPassword(id, email, phno, security_question, security_answer,function(callback){
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
    agentManagement.resetPassword(id, email, password, function(callback){
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
//update agent Information route starts
router.post('/updateProfile', function(req, res){
  console.log(req.body);
  var id = req.body.id;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var company = req.body.company;
  var email = req.body.email;
  var phno = req.body.phno;
  var address = req.body.address;
  if (!id || !firstname || !lastname || !company ||!email || !phno || !address) {
          res.redirect('/');
  }
  else {
  agentManagement.editAgentInformation(id, firstname, lastname, company, email, phno, address, function(callback){
    if (callback === true) {
      res.send("successfully Updated user Information .......");
    }else {
      console.log(callback);
      res.redirect('/');
    }
  });
  }
});
// update agent Information route ends
module.exports = router;
