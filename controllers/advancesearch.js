var pool = require('../models/connect');

module.exports.search = function(property_name, property_type, property_variation, property_location, property_area, property_minprice, property_maxprice, callback){

         var q = "select * from property_list where ";
        if (property_name) {
          q = q+"property_name='"+property_name+"'";
          if (property_type) {
            q = q+" AND property_type='"+property_type+"'";
          }
          if (property_variation) {
            q = q+" AND property_variation='"+property_variation+"'";
          }
          if (property_location) {
            q = q+" AND property_location='"+property_location+"'";
          }
          if (property_area) {
            q = q+" AND property_area='"+property_area+"'";
          }
          if (property_minprice && property_maxprice) {
            // q = q+" AND property_price='"+property_price+"'";
            q = q+" AND property_price BETWEEN "+property_minprice+" AND "+property_maxprice;
          }else if (property_minprice) {
            q = q+" AND property_price >= "+property_minprice;
          }else if (property_maxprice) {
            q = q+" AND property_price <= "+property_maxprice;
          }
        }else if (property_type) {
          q = q+"property_type='"+property_type+"'";
          if (property_variation) {
            q = q+" AND property_variation='"+property_variation+"'";
          }
          if (property_location) {
            q = q+" AND property_location='"+property_location+"'";
          }
          if (property_area) {
            q = q+" AND property_area='"+property_area+"'";
          }
          if (property_minprice && property_maxprice) {
            // q = q+" AND property_price='"+property_price+"'";
            q = q+" AND property_price BETWEEN "+property_minprice+" AND "+property_maxprice;
          }else if (property_minprice) {
            q = q+" AND property_price >="+property_minprice;
          }else if (property_maxprice) {
            q = q+" AND property_price <= "+property_maxprice;
          }
        }else if (property_variation) {
          q = q+"property_variation='"+property_variation+"'";
          if (property_location) {
            q = q+" AND property_location='"+property_location+"'";
          }
          if (property_area) {
            q = q+" AND property_area='"+property_area+"'";
          }
          if (property_minprice && property_maxprice) {
            // q = q+" AND property_price='"+property_price+"'";
            q = q+" AND property_price BETWEEN "+property_minprice+" AND "+property_maxprice;
          }else if (property_minprice) {
            q = q+" AND property_price >= "+property_minprice;
          }else if (property_maxprice) {
            q = q+" AND property_price <="+property_maxprice;
          }
        }else if (property_location) {
          q = q+"property_location='"+property_location+"'";
          if (property_area) {
            q = q+" AND property_area='"+property_area+"'";
          }
          if (property_minprice && property_maxprice) {
            // q = q+" AND property_price='"+property_price+"'";
            q = q+" AND property_price BETWEEN "+property_minprice+" AND "+property_maxprice;
          }else if (property_minprice) {
            q = q+" AND property_price >= "+property_minprice;
          }else if (property_maxprice) {
            q = q+" AND property_price <= "+property_maxprice;
          }
        }else if (property_area) {
          q = q+"property_area='"+property_area+"'";
          if (property_minprice && property_maxprice) {
            // q = q+" AND property_price='"+property_price+"'";
            q = q+" AND property_price BETWEEN "+property_minprice+" AND "+property_maxprice;
          }else if (property_minprice) {
            q = q+" AND property_price >= "+property_minprice;
          }else if (property_maxprice) {
            q = q+" AND property_price <= "+property_maxprice;
          }
        }else if (property_minprice && property_maxprice) {
          // q = q+"property_price='"+property_price+"'";
          q = q+"property_price BETWEEN "+property_minprice+" AND "+property_maxprice;
        }else if (property_minprice) {
          q = q+"property_price >= "+property_minprice;
        }else if (property_maxprice) {
          q = q+"property_price <= "+property_maxprice;
        }
        // return callback(q);
        pool.getConnection(function(error, connection){
          if(error) return callback(error);
          connection.query(q,function(error, results, fields){
            connection.release();
            if(error) return callback(error);
            if (results.length == 0) {
              return callback([false,"Could not found Search Result....."]);
            }else {
              return callback(results);
            }
          });
        });

}


//1. search property based on location filter
//parameters===>  1. location:string;
module.exports.searchLocation = function(location){
  return "Returns all property details filtered with the given location "+location;
}

//2. search property based on propertytype filter
//parameters===>  1. propertytype:string;
module.exports.searchPropertyType = function(propertytype){
  return "Returns all property details filtered with property type "+propertytype;
}

//3. search property based on propertyvariation filter
//parameters===>  1. propertyvariation:string;
module.exports.searchPropertyVariation = function(propertyvariation){
  return "Returns all property details filtered with property variation "+propertyvariation;
}

//4. search property based on proximity filters
//parameters===>  1. airportdistance:integer;
//                2. ferrydistance:integer;
module.exports.searchProximity = function(airportdistance,ferrydistance){
  return "Returns all the property details filtered with proximities airportdistance: "+airportdistance+" ferrydistance: "+ferrydistance;
}

//4. search property based on budget with minprice and maxprice filters
//parameters===>  1. minprice:integer;
//                2. maxprice:integer;
module.exports.searchBudget = function(minprice, maxprice){
  return "Returns all the property details filterd with Budget min price: "+minprice+" max price: "+maxprice;
}
