var express = require("express");
var bodyParser =  require("body-parser");
var fs = require('fs');
var agents = require('./routes/agents');
var users = require('./routes/users');


var app = express();
app.set('port',process.env.PORT||3000);
app.use(bodyParser.urlencoded({ extended: false }))
// var _this = this;
app.use('/agents',agents);
app.use('/users',users);



//for testing
app.get('/', function(req, res){
  res.send("home page.......");
})
app.get('/users',function(req,res){
  // var index = fs.readFileSync('./first.html');
  // res.end(index);
  res.sendFile('users.html',{root:'./'})
});
app.get('/agents',function(req,res){
  // var index = fs.readFileSync('./first.html');
  // res.end(index);
  res.sendFile('agents.html',{root:'./'})
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

app.listen(app.get('port'),function(){
  console.log("server started on port "+app.get('port'));
});
