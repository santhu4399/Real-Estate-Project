var express = require('express');
var agentManagement = require('../controllers/agentManagement');
var router = express.Router();

router.get('/',function(req,res){
  // var index = fs.readFileSync('./first.html');
  // res.end(index);
  res.sendFile('agents.html',{root:'./'})
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
          res.render('login',{error:errors,user:false,agent:true,admin:false,reg:false,success:''});
        }else {
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
    var firstname = req.body.firstname.trim();
    var lastname = req.body.lastname.trim();
    var company = req.body.company.trim();
    var email = req.body.email.trim();
    var phno = req.body.phno.trim();
    var address = req.body.address.trim();
    var security_question = req.body.security_question.trim();
    var security_answer = req.body.security_answer.trim();
    var password = req.body.password.trim();
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
  var email = req.body.email.trim();
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
    var id = req.body.id.trim();
    var email = req.body.email.trim();
    var phno = req.body.phno.trim();
    var security_question = req.body.security_question.trim();
    var security_answer = req.body.security_answer.trim();
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
  var id = req.body.id.trim();
  var email = req.body.email.trim();
  var password = req.body.password.trim();
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
  var id = req.body.id.trim();
  var firstname = req.body.firstname.trim();
  var lastname = req.body.lastname.trim();
  var company = req.body.company.trim();
  var email = req.body.email.trim();
  var phno = req.body.phno.trim();
  var address = req.body.address.trim();
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
