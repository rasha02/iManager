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



//**************************** Add Document *****************************

router.post('/addDocument', function (req, res) {
  var getDaysInMonth = function (month, year) {
    // Here January is 1 based
    //Day 0 is the last day in the previous month
    return new Date(year, month, 0).getDate();
// Here January is 0 based
// return new Date(year, month+1, 0).getDate();
  };
  let date = new Date()
  var month = date.getMonth()
  var year = date.getFullYear()
  var dayNbr = getDaysInMonth(date.getMonth(), date.getFullYear());
  var doc = new docModel(
    {
      name: req.query.name,
      month: month,
      year: year,
      dayNbr: dayNbr,
      validation: req.query.validation,
      comment: req.query.comment,
      files: [],
      activity: []
    });

  userModel.findById(req.query.idUser, function (err, user) {
    console.log(user)
    if (err) {
      res.send({err: 'there are error'})
    }
    else {
      console.log(user.projs)
      for(var i=0;i<user.projs.length;i++) {
        if (user.projs[i]._id == req.query.idProj) {
          user.projs[i].docs.push(doc)
        }
      }
      user.save(function (err) {
        console.log(err)

        if (err) {
          res.send({state: false})
        }
        else {
        }
      })
    }
  })

  projectModel.findById(req.query.idProj, function (err, project) {
    console.log(project.docs)
    if (err) {
      res.send({err: 'there are error'})
    }
    else {
      project.docs.push(doc)
      project.save(function (err) {
        console.log(err)
        if (err) {
          res.send({state: false})
        }
        else {
          res.send({state: true})
        }
      })
    }
  })


})



// **************************** Get Docs by user**************************

router.get('/getDocsByUserByProj', function (req, res) {

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

router.get('/getDocsByProject', function (req, res) {

  projectModel.findById(req.query.idproj, function (err, project) {
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
