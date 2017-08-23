var express = require('express');
var propertyListing = require('../controllers/propertyListingManagement');
var propertyManagement = require('../controllers/agentpropertyCreation');
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

// Proerty Creation Router starts
router.post('/addProperty',function(req, res){
  console.log(req.body)
  var agent_id = req.body.agentid.trim();
  var property_name = req.body.pname.trim();
  var property_type = req.body.ptype.trim();
  var property_variation = req.body.pvariation.trim();
  var property_location = req.body.plocation.trim();
  var property_area = req.body.parea.trim();
  var property_price = req.body.pprice.trim();
  if (!agent_id || !property_name || !property_type || !property_variation || !property_location || !property_area || !property_price) {
          // res.redirect('/');
          res.send("fields can not be Empty.....")
  }
  else {
  propertyManagement.createProperty(agent_id, property_name, property_type, property_variation, property_location, property_area, property_price, function(callback){
    res.send(callback);
  });
  }
});
// Proerty Creation Router ends

// Proerty edit Router starts
router.post('/updateProperty',function(req, res){
  console.log(req.body)
  var id = req.body.pid.trim();
  var property_name = req.body.pname.trim();
  var property_type = req.body.ptype.trim();
  var property_variation = req.body.pvariation.trim();
  var property_location = req.body.plocation.trim();
  var property_area = req.body.parea.trim();
  var property_price = req.body.pprice.trim();
  if (!id || !property_name || !property_type || !property_variation || !property_location || !property_area || !property_price) {
          // res.redirect('/');
          res.send("fields can not be Empty.....");
  }
  else {
  propertyManagement.updateProperty(id, property_name, property_type, property_variation, property_location, property_area, property_price, function(callback){
    res.send(callback);
  });
  }
});
// Proerty edit Router ends

// Proerty delete Router starts
router.post('/deleteProperty',function(req, res){
  var id = req.body.pid.trim();
  if (!id) {
          res.send("fields can not be Empty.....");
  }
  else {
  propertyManagement.deleteProperty(id, function(callback){
    res.send(callback);
  });
  }
});
// Proerty delete Router ends

module.exports = router;
