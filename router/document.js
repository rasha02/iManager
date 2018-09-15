var express = require('express');
var docModel=require('../models/docModel');
var projectModel=require('../models/projectModel');
var userModel=require('../models/userModel');
var db=require('../models/db');
//var bodyParser = require('body-parser');

var router = express();

//router.use(bodyParser.urlencoded({ extended: false }))


//************************ Get all docs ***************************
router.get('/', function (req, res) {

  docModel.find({},function (err, result) {
    res.send(result)
  })

})

// **************************** Get Docs by user**************************

router.get('/listDocByUser', function (req, res) {

  userModel.findById(req.query.idUser, function (err, user) {
    console.log(user)
    if (err) {
      res.send({err: 'there are error'})
    }
    else {

      var docbyuser=[]
      this.docbyuser=[]
      for(var  i=0;i<user.projs.length;i++){
        if( user.projs[i]._id == req.query.idProj){

          this.docbyuser=user.projs[i].docs
        }

      }
      res.send( this.docbyuser)

    }
  })
})
// **************************** Get Docs by user**************************

router.get('/listDocByProject', function (req, res) {

  projectModel.findById(req.query.idProj, function (err, project) {
    console.log(project)
    if (err) {
      res.send({err: 'there are error'})
    }
    else {
      console.log(project.docs)
      res.send(project.docs)

    }
  })
})

module.exports=router;
