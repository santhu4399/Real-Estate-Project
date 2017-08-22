var pool = require('../models/connect');
//1. list all properties of all Agents
module.exports.listAllProperties = function(callback){
  var q = "select * from property_list";
  pool.getConnection(function(error, connection){
    if (error) return callback(error);
    connection.query(q,function(error, results, fields){
      connection.release();
      if (error) return callback(error);
      if (results.length == 0) {
        return callback([false,"Total Property count is zero.... can not get property List"]);
      }else {
        return callback(results);
      }
    });
  });
}
//1. list all properties of perticular Agents
module.exports.agentPropertyList = function(agent_id, callback){
  var q = "select * from property_list where agent_id="+agent_id;
  pool.getConnection(function(error, connection){
    if (error) return callback(error);
    connection.query(q,function(error, results, fields){
      connection.release();
      if (error) return callback(error);
      if (results.length == 0) {
        return callback([false,"Total Property count is zero.... can not get property List"]);
      }else {
        return callback(results);
      }
    });
  });
}
