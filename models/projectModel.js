var mongoose= require('mongoose');
var Schema= mongoose.Schema;

var ActivityModelSchema = new Schema({
  day: String,
  presence : Boolean
});
var FilesModelSchema = new Schema({
  filename: String,
});
var DocModelSchema = new Schema({
  month:String,
  year:String,
  dayNbr:Number,
  validation:Boolean,
  comment:String,
  files: [FilesModelSchema],
  activity : [ActivityModelSchema]
});
var UserModelSchema = new Schema({
  name: String,
  email: String,
  password: String
});
var ProjectModelSchema = new Schema({
  name  : String,
  docs: [DocModelSchema],
  users : [UserModelSchema]
});

var ProjectModel= mongoose.model('ProjectModel', ProjectModelSchema);



module.exports= ProjectModel;
