var express=require('express');
var cors=require('cors');

var admin=require('./router/admin');
var user=require('./router/user');
var project=require('./router/project');
var document=require('./router/document');
var bodyParser = require('body-parser');

var app= express();
app.use(cors());


 //parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
//app.use(bodyParser.json())



app.use('/admin', admin);
app.use('/users', user);
app.use('/projects', project);
app.use('/documents', document);




app.use('/', function(req,res){
  res.send("Welcome to my sever")
});

app.listen(3000,function() {

    console.log("ok");

})
