var pool = require('../models/connect');
//1. New User Registration Fucntion
//parameters===>  1. firstname:string;
//                2. lastname:string;
//                3. email:string;
//                4. phno:integer;
//                5. address:string;
//                6. secqn:string;  security question for future reference
//                7. secans:string; security answer for future reference
//                8. password:string;
module.exports.newUserRegistration = function(firstname,lastname,email,phno,address,security_question,security_answer,password,callback){
  var q1 = "select * from users where email='"+email+"'";
  pool.getConnection(function(error, connection){
    if(error) return callback(error);
    connection.query(q1,function(error,results,fields){
      connection.release();
      if(error) return callback(error);
      if (results.length == 0) {
        var q2 = "insert into users (firstname,lastname,email,phno,address,security_question,security_answer,password,date_of_registration,date_of_update) values ('"+firstname+"','"+lastname+"','"+email+"','"+phno+"','"+address+"','"+security_question+"','"+security_answer+"','"+password+"',current_date(),current_date())";
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

//2. User Login Function
//parameters===>  1. email:string;
//                2. password:string;
module.exports.userLogin = function(email, password, callback){
  var q = "select * from users where email='"+email+"'AND password='"+password+"'";
  pool.getConnection(function(error, connection){
    if(error) return callback(error);
    connection.query(q,function(error,results,fields){
      connection.release();
      if(error) return callback(error);
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
module.exports.forgotPassword = function(email, callback){
  var q = "select * from users where email='"+email+"'";
  pool.getConnection(function(error, connection){
    if(error) throw error;
    connection.query(q, function(error,results,fields){
      connection.release();
      if(error) return callback(error);
      console.log(results);
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
  var q = "select * from users where id='"+id+"' AND email='"+email+"' AND phno='"+phno+"' AND security_question='"+security_question+"' AND security_answer='"+security_answer+"'";
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

//4. Reset user password
//parameters===>  1. email:string;
//                2. password:string;
module.exports.resetPassword = function(id, email, password, callback){
  var q = "update users set password='"+password+"',date_of_update=current_date() where id="+id+" AND email='"+email+"'";
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
module.exports.editUserInformation = function(id, firstname, lastname, email, phno, address, callback){
  var q = "update users set firstname='"+firstname+"',lastname='"+lastname+"',phno='"+phno+"',address='"+address+"',date_of_update=current_date() where id="+id+" AND email='"+email+"'";
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
