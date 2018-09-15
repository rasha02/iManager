var mongoose= require('mongoose');
var Schema= mongoose.Schema;

var ActivityModelSchema = new Schema({


  day: String,
  presence : Boolean



});

var ActivityModel= mongoose.model('ActivityModel', ActivityModelSchema);



module.exports= ActivityModel;
