var express = require("express");
var bodyParser =  require("body-parser");
var fs = require('fs');
var ejs = require('ejs');
var agents = require('./routes/agents');
var users = require('./routes/users');
var propertyListing = require('./routes/property');
var search = require('./routes/search');
var adminpanel = require('./routes/admin');

var app = express();
app.set('port',process.env.PORT||3000);
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/agents', agents);
app.use('/users', users);
app.use('/propertyListing', propertyListing);
app.use('/search', search);
app.use('/admin',adminpanel);

//for testing
app.get('/', function(req, res){
  // res.sendFile('admin.html',{root:'./'});
  res.render('login');
});

app.listen(app.get('port'),function(){
  console.log("server started on port "+app.get('port'));
});
