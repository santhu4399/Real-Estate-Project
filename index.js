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

//EndPoints
// app.get('/advanceSearchProperty/:filter',function(req, res){
//           var filters = [req.params.filter];
//           var result = _this.advanceSearchProperty(filters);
//           res.send(result);
// });
// app.get('/advanceSearchProperty/:filter1/:filter2',function(req, res){
//           var filters = [req.params.filter1,req.params.filter2];
//           var result = _this.advanceSearchProperty(filters);
//           res.send(result);
// });
// app.get('/advanceSearchProperty/:filter1/:filter2/:filter3',function(req, res){
//           var filters = [req.params.filter1,req.params.filter2,req.params.filter3];
//           var result = _this.advanceSearchProperty(filters);
//           res.send(result);
// });
