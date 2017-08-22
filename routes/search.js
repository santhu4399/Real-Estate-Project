var express = require('express');
var advanceSearch = require('../controllers/advanceSearch');
var propertyListing = require('../controllers/propertyListingManagement');
var router = express.Router();

router.get('/advanceSearch',function(req, res){
  console.log(req.query);
  var property_name = req.query.pname.trim();
  var property_type = req.query.ptype.trim();
  var property_variation = req.query.pvariation.trim();
  var property_location = req.query.plocation.trim();
  var property_area = req.query.parea.trim();
  // var property_price = req.query.pprice.trim();
  var property_minprice = req.query.minprice.trim();
  var property_maxprice = req.query.maxprice.trim();
  var q;
  if (!property_name && !property_type && !property_variation && !property_location && !property_area && !property_minprice && !property_maxprice) {
    // q = "select * from property_list";
    //     return callback(q);
        propertyListing.listAllProperties(function(callback){
          res.send(callback);
        });
  }else {
    advanceSearch.search(property_name, property_type, property_variation, property_location, property_area, property_minprice, property_maxprice, function(callback){
      res.send(callback);
    });
  }

});

module.exports = router;
