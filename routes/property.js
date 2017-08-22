var express = require('express');
var propertyListing = require('../controllers/propertyListingManagement');
var router = express.Router();

router.get('/all',function(req, res){
  propertyListing.listAllProperties(function(callback){
    console.log(callback);
    res.send(callback);
  });
});

router.get('/agentPropertyList/:agent_id', function(req, res){
  propertyListing.agentPropertyList(req.params.agent_id,function(callback){
    console.log(callback);
    res.send(callback);
  });
});

module.exports = router;
