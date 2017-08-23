var pool = require('../models/connect');

//1. Create Property function only accessed by Agents
//parameters===>  1. agent_id:interger,
//                2. propertyname:string,
//                3. propertytype:string,
//                4. propertyvariation:string,
//                5. property_location:string,
//                6. property_area:String,
//                7. property_price:interger;
module.exports.createProperty = function(agent_id, property_name, property_type, property_variation, property_location, property_area, property_price, callback){
  var q = `insert into property_list (agent_id, property_name, property_type, property_variation, property_location, property_area, property_price) VALUES (${agent_id}, '${property_name}', '${property_type}', '${property_variation}', '${property_location}', '${property_area}', ${property_price})`;
  pool.getConnection(function(error, connection){
    if(error) return callback(error);
    connection.query(q,function(error,results,fields){
      connection.release();
      if(error) return callback(error);
      console.log(results);
      if (results.affectedRows == 1) {
        return callback("Property Added successfully...");
      }else {
      return callback(results);
      }
    });
  });
}

//2. update property details only accessed by Agents
//parameters===>  1. id:interger,
//                2. propertyname:string,
//                3. propertytype:string,
//                4. propertyvariation:string,
//                5. property_location:string,
//                6. property_area:String,
//                7. property_price:interger;
module.exports.updateProperty = function(id, property_name, property_type, property_variation, property_location, property_area, property_price, callback){
  var q = `update property_list set property_name='${property_name}',property_type='${property_type}',property_variation='${property_variation}',property_location='${property_location}',property_area='${property_area}',property_price=${property_price} where id=${id}`;
  pool.getConnection(function(error, connection){
    if(error) return callback(error);
    connection.query(q,function(error,results,fields){
      connection.release();
      if(error) return callback(error);
      if (results.affectedRows == 1) {
        return callback("Property updated successfully...");
      }else {
      return callback(results);
      }
    });
  });
}

//3. delete property function only accessed by Agents
//parameters===>  1. id:interger;
module.exports.deleteProperty = function(id, callback){
  var q = `delete from property_list where id=${id}`
  pool.getConnection(function(error, connection){
    if(error) return callback(error);
    connection.query(q,function(error,results,fields){
      connection.release();
      if(error) return callback(error);
      if (results.affectedRows == 1) {
        return callback("Property deleted successfully...");
      }else {
      return callback([false,'invalid input.........']);
      }
    });
  });
}
