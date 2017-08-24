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
              res.redirect(`/admin/dashboard/${callback[1]}`);
              // request.post({url:'http://localhost:3000/admin/dashboard/post', form: {id:`${callback[1]}`}}, function(err,response,body){
              //   if(err) throw err;
              //   res.send(body);
              // });
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

// router.post('/dashboard/post',function(req,res){
//   adminpanel.getAdminDashboard(req.body.id, function(callback){
//     res.send(callback);
//   });
// });

router.get('/getAllUsers',function(req, res){
      adminpanel.userAccessManagement(function(callback){
        res.send(callback);
      });
});
router.get('/getAllAgents',function(req, res){
  adminpanel.agentAccessManagement(function(callback){
    res.send(callback);
  });
});
router.post('/blockUser',function(req, res){
  adminpanel.blockUser(req.body.email, function(callback){
      res.send(callback);
  });
});
router.post('/unBlockUser',function(req, res){
  adminpanel.unBlockUser(req.body.email, function(callback){
      res.send(callback);
  });
});
router.post('/blockAgent',function(req, res){
  adminpanel.blockAgent(req.body.email, function(callback){
      res.send(callback);
  });
});
router.post('/unBlockAgent',function(req, res){
  adminpanel.unBlockAgent(req.body.email, function(callback){
      res.send(callback);
  });
});
module.exports = router;
