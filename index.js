var express = require("express");
var bodyParser =  require("body-parser");
var fs = require('fs');
var agents = require('./routes/agents');
var users = require('./routes/users');
var propertyListing = require('./routes/property');
var search = require('./routes/search');
var pool = require('./models/connect');

var app = express();
app.set('port',process.env.PORT||3000);
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/agents', agents);
app.use('/users', users);
app.use('/propertyListing', propertyListing);
app.use('/search', search);

//for testing
app.get('/', function(req, res){
  // res.send("home page.......");
  res.sendFile('search.html',{root:'./'});
  // var q = 'call adminDashboard(@totalusers,@totalagents,@todayusers,@todayagents,@user);select @totalusers,@totalagents,@todayusers,@todayagents;select @user;'
  // pool.getConnection(function(error, connection){
  //   if(error) return callback(error);
  //   connection.query(q,function(error,results,fields){
  //     connection.release();
  //       if(error) throw error;
  //       res.send(results);
  //   });
  // });
});

app.listen(app.get('port'),function(){
  console.log("server started on port "+app.get('port'));
});
