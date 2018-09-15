var mongoose = require('mongoose');
//define schema
var Schema= mongoose.Schema;

var AdminModelSchema = new Schema({
  email: {type: String,unique:true},
  password: String,
  name: String

});

//Compile model from schema
var AdminModel = mongoose.model('AdminModel', AdminModelSchema);


module.exports=AdminModel;
