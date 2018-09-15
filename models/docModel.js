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

var DocModel= mongoose.model('DocModel', DocModelSchema);

module.exports= DocModel;
