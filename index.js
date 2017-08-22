var express = require("express");
var bodyParser =  require("body-parser");
var fs = require('fs');
var agents = require('./routes/agents');
var users = require('./routes/users');
var propertyListing = require('./routes/property');
var search = require('./routes/search');

var app = express();
app.set('port',process.env.PORT||3000);
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/agents',agents);
app.use('/users',users);
app.use('/propertyListing', propertyListing);
app.use('/search',search);

//for testing
app.get('/', function(req, res){
  // res.send("home page.......");
  res.sendFile('search.html',{root:'./'})
});

app.listen(app.get('port'),function(){
  console.log("server started on port "+app.get('port'));
});
