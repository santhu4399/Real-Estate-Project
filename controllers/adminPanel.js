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

module.exports.getAllClients = function(callback){


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
module.exports.userAccessManagement = function(callback){
  var q = "select * from users";
  pool.getConnection(function(error, connection){
    if(error) return callback(error);
    connection.query(q,function(error,results,fields){
      connection.release();
        if(error) return callback(error);
        return callback(results);
    });
  });
}

//6. agent access management function to manage access controls of all the agents registered in the portal
module.exports.agentAccessManagement = function(callback){
  var q = "select * from agents";
  pool.getConnection(function(error, connection){
    if(error) return callback(error);
    connection.query(q,function(error,results,fields){
      connection.release();
        if(error) return callback(error);
        return callback(results);
    });
  });
}

//7. Block user function
//parameter===> 1. email:string;
module.exports.blockUser = function(email, callback){
  var q = `update users set is_active='false' where email='${email}'`;
  pool.getConnection(function(error, connection){
    if(error) return callback(error);
    connection.query(q,function(error,results,fields){
      connection.release();
        if(error) return callback(error);
        return callback(results);
    });
  });
}

//8. unBlock user function
//parameter===> 1. email:string;
module.exports.unBlockUser = function(email, callback){
  var q = `update users set is_active='true' where email='${email}'`;
  pool.getConnection(function(error, connection){
    if(error) return callback(error);
    connection.query(q,function(error,results,fields){
      connection.release();
        if(error) return callback(error);
        return callback(results);
    });
  });
}

//9. Block Agent function
//parameter===> 1. email:string;
module.exports.blockAgent = function(email, callback){
  var q = `update agents set is_active='false' where email='${email}'`;
  pool.getConnection(function(error, connection){
    if(error) return callback(error);
    connection.query(q,function(error,results,fields){
      connection.release();
        if(error) return callback(error);
        return callback(results);
    });
  });
}

//10. unBlock Agent function
//parameter===> 1. email:string;
module.exports.unBlockAgent = function(email,callback){
  var q = `update agents set is_active='true' where email='${email}'`;
  pool.getConnection(function(error, connection){
    if(error) return callback(error);
    connection.query(q,function(error,results,fields){
      connection.release();
        if(error) return callback(error);
        return callback(results);
    });
  });
}
