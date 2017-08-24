var pool = require('../models/connect');

module.exports.adminLogin = function(email, password, callback){
  var q = "select * from admin where email='"+email+"'AND password='"+password+"'";
  pool.getConnection(function(error, connection){
    if(error) return callback(error);
    connection.query(q,function(error,results,fields){
      connection.release();
      if(error) return callback(error);
      if (results.length == 0) {
        return callback(false);
      }else {
          return callback([true,`${results[0].email}`]);
      }
    });
  });
}
module.exports.getAdminDashboard = function(id, callback){
  var q = `call adminDashboard('${id}')`;
  pool.getConnection(function(error, connection){
    if(error) return callback(error);
    connection.query(q,function(error,results,fields){
      connection.release();
        if(error) return callback(error);
        return callback(results);
    });
  });
}

//3. present users logged in the portal
module.exports.currentUsersLog = function(){
  return "Returns emails of current logged users in the portal";
}

//4. present Agents logged in the portal
module.exports.currentAgentsLog = function(){
  return "Returns emails of current logged agents in the portal";
}

//5. user access management function to manage access controls of all the users registered in the portal
module.exports.userAccessManagement = function(){
  return "Returns all the registered users information in the portal";
}

//6. agent access management function to manage access controls of all the agents registered in the portal
module.exports.agentAccessManagement = function(){
  return "Returns all the registered agents information in the portal";
}

//7. Block user function
//parameter===> 1. email:string;
module.exports.blockUser = function(email){
  return "Returns email of blocked user "+email;
}

//8. unBlock user function
//parameter===> 1. email:string;
module.exports.unBlockUser = function(email){
  return "Returns email of unblocked user "+email;
}

//9. Block Agent function
//parameter===> 1. email:string;
module.exports.blockAgent = function(email){
  return "Returns email of blocked Agent "+email;
}

//10. unBlock Agent function
//parameter===> 1. email:string;
module.exports.unBlockAgent = function(email){
  return "Returns email of unblocked Agent "+email;
}
