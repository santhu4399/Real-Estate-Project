var pool = require('../models/connect');
//1. New Agent Registration Fucntion
//parameters===>  1.agentid:integer;
//                2. firstname:string;
//                3. lastname:string;
//                4. gender:string;
//                5. email:string;
//                6. phno:integer;
//                7. address:string;
//                8. secqn:string;  security question for future reference
//                9. secans:string; security answer for future reference
//                10. password:string;
module.exports.newAgentRegistration = function(firstname,lastname,company,email,phno,address,security_question,security_answer,password,callback){
  var q1 = "select * from agents where email='"+email+"'";
  pool.getConnection(function(error, connection){
    if(error) return callback(error);
    connection.query(q1,function(error,results,fields){
      connection.release();
      if(error) return callback(error);
      if (results.length == 0) {
        var q2 = "insert into agents (firstname,lastname,company,email,phno,address,security_question,security_answer,password,date_of_registration,date_of_update) values ('"+firstname+"','"+lastname+"','"+company+"','"+email+"','"+phno+"','"+address+"','"+security_question+"','"+security_answer+"','"+password+"',current_date(),current_date())";
        pool.getConnection(function(error, connection){
          if(error) return callback(error);
          connection.query(q2,function(error,results,fields){
            connection.release();
            if(error) return callback(error);
            return callback("Registration successful "+results);
          });
        });
      }else {
        return callback("Email already registered....");
      }
    });
  });
}


//2. Agent Login Function
//parameters===>  1. email:string;
//                2. password:string;
module.exports.agentLogin = function(email, password, callback){
  var q = "select * from agents where email='"+email+"'AND password='"+password+"'";
  pool.getConnection(function(error, connection){
    if(error) return callback(error);
    connection.query(q,function(error,results,fields){
      connection.release();
      if(error) throw error;
      if (results.length == 0) {
        return callback(false);
      }else {
        if (results[0].is_active == 'false') {
          return callback("your login has been blocked please contact to administrator....");
        }else {
          return callback(true);
        }
      }
    });
  });
}

//3. Forgot Password function
//parameters===>  1. email:string;
//                2. phno:integer;
//                3. secqn:string; security question for authentication
//                4. secans:string; security answer for authentication
module.exports.forgotPassword = function(email, callback){
  var q = "select * from agents where email='"+email+"'";
  pool.getConnection(function(error, connection){
    if(error) throw error;
    connection.query(q, function(error,results,fields){
      connection.release();
      if(error) return callback(error);
      if (results.length == 0) {
        return callback(false);
      }
      else {
        return callback([true,results[0].id,results[0].email,results[0].security_question]);
      }
    });
  });
}

module.exports.recoverPassword = function(id, email, phno, security_question, security_answer, callback){
  var q = "select * from agents where id='"+id+"' AND email='"+email+"' AND phno='"+phno+"' AND security_question='"+security_question+"' AND security_answer='"+security_answer+"'";
  pool.getConnection(function(error, connection){
    if(error) return callback(error);
    connection.query(q,function(error,results,fields){
      connection.release();
        if(error) return callback(error);
        if (results.length == 0) {
          return callback(false);
        }else {
          return callback([true,results[0].id,results[0].email]);
        }
    });
  });
}

//4. Reset agent password
//parameters===>  1. email:string;
//                2. password:string;
module.exports.resetPassword = function(id, email, password, callback){
  var q = "update agents set password='"+password+"',date_of_update=current_date() where id="+id+" AND email='"+email+"'";
  pool.getConnection(function(error, connection){
    if(error) return callback(error);
    connection.query(q,function(error,results,fields){
      connection.release();
        if(error) return callback(error);
        console.log(results);
        if (results.affectedRows === 1) {
          return callback(true);
        }else {
          return callback(false);
        }
    });
  });
}

//5. Update user Information function
//parameters===>  1. firstname:string;
//                2. lastname:string;
//                3. gender:string;
//                4. email:string;
//                5. phno:integer;
//                6. address:string;
module.exports.editAgentInformation = function(id, firstname, lastname, company, email, phno, address, callback){
  var q = "update agents set firstname='"+firstname+"',lastname='"+lastname+"',company='"+company+"',phno='"+phno+"',address='"+address+"',date_of_update=current_date() where id="+id+" AND email='"+email+"'";
  pool.getConnection(function(error, connection){
    if(error) return callback(error);
    connection.query(q,function(error,results,fields){
      connection.release();
        if(error) return callback(error);
        console.log(results);
        if (results.affectedRows === 1) {
          return callback(true);
        }else {
          return callback(false);
        }
    });
  });
}
