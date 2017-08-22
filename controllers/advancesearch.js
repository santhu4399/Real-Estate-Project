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
