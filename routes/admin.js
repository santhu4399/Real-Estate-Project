var express = require('express');
var adminpanel = require('../controllers/adminPanel');
var router = express.Router();
var request = require('request');


router.post('/login',function(req, res){
    var email = req.body.email.trim();
    var password = req.body.password.trim();
      if (!email || !password) {
              res.redirect('/');
      }
      else {
          adminpanel.adminLogin(email, password, function(callback){
            if (callback[0] == true) {
              // res.redirect(`/admin/dashboard/${callback[1]}`);
              request.post({url:'http://localhost:3000/admin/dashboard/post', form: {id:`${callback[1]}`}}, function(err,response,body){
                if(err) throw err;
                res.send(body);
              });
            }
            else {
              console.log(callback);
              res.redirect('/');
            }
          });
      }
});

router.get('/dashboard/:id',function(req,res){
  adminpanel.getAdminDashboard(req.params.id, function(callback){
    res.send(callback);
  });
});

router.post('/dashboard/post',function(req,res){
  // console.log("from post method");
  // console.log(req.body);
  adminpanel.getAdminDashboard(req.body.id, function(callback){
    res.send(callback);
  });
});

module.exports = router;
