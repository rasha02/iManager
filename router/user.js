var express = require('express');
var userModel = require('../models/userModel');
var projectModel = require('../models/projectModel');
var db = require('../models/db');


var router = express();


//******************** Get all users **********************
router.get('/', function (req, res) {

  userModel.find({}, function (err, result) {
    res.send(result)
  })

})



router.get('/getNameUser', function (err, res) {
  userModel.findById({id: req.query.id}, function (err, user) {
    if (err) {
      res.send({err: 'there are error'})
    }
    else {
      res.send(user.name)
    }
  })
})
// *********************** find user by his lastName *******************
router.get('/bylastName', function (req, res) {

  userModel.find({name: req.body.name}, function (err, result) {
    res.send(result)
  })

})

// ****************** Find user by a key word *******************
router.get('/key', function (req, res) {

  userModel.find({
    "$or": [
      {
        "name": req.body.mot
      },
      {
        "email": req.body.mot
      }
    ]
  }, function (err, result) {
    res.send(result)

  })
})

//************************* Add a new user ****************************

router.post('/addUser', function (req, res) {

  console.log(req.query)

  var user = new userModel({name: req.query.name, email: req.query.email, password: req.query.password});

  user.save(function (err) {
    if (err) {
      res.send({state: false})
    }
    else {
      res.send({state: true})
    }
  })
})

//*************************** Update user ************************

router.put('/updateUser', function (req, res) {
   userModel.findByIdAndUpdate(req.query.id, {
    name: req.query.name,
    email: req.query.email,
    password: req.query.password
  }, {new: true}, function (err, result) {

     if (err) {
       res.send({"state": "error"})
     }
     else {
       console.log(result)
     }
   })


  userModel.findById(req.query.id , function(err , user){
    console.log(user)
    for(var i=0 ; i<user.projs.length ; i++){
    console.log(user.projs[i]._id)
      projectModel.find({_id : user.projs[i]._id} , function( err , projet){

        console.log(projet)

        for(var j=0 ; j< projet[0].users.length ;j++){
          if(projet[0].users[j]._id == req.query.id ){
            projet[0].users[j].name = req.query.name
            projet[0].users[j].email = req.query.email
            projet[0].users[j].password = req.query.password
          }
        }
        projet[0].save(function (err) {
          if (err) {
            res.send({state: false})
          }
          else {
            //res.send({state: true})
          }
        })
      })
    }
    res.send({state: true})
  })

})

//************************** Delete a user ***********************

router.get('/removeUser', function (req, res) {

  userModel.findById(req.query.id , function(err , user) {
    for (var i = 0; i < user.projs.length; i++) {

      projectModel.findById(user.projs[i]._id, function (err, project) {
        console.log(project)
        var newuser = []
        this.newuser = []
        for (var j = 0; j < project.users.length; j++) {

          if (project.users[j]._id != req.query.id) {
            this.newuser.push(project.users[j])
          }

        }
        project.users = this.newuser

        project.save(function (err) {
          if (err) {
            res.send({state: false})
          }
          else {
            //res.send({state: true})
          }
        })
      })

          if(i== user.projs.length - 1){
            userModel.remove({_id: req.query.id}, function (err ) {

              if(err){
                res.send({"state": "error"})
              }

              else {

                res.send({"state": "ok"})
              }
            })
          }

    }
  })

 })


router.get('/findById', function (req, res) {

  userModel.findById({_id: req.query.id}, function (err, result) {

    res.send(result)
  })

})


//************************** Get users by project ***********************

router.get('/getUsersByProject', function (req, res) {


  projectModel.findById({_id: req.query.idproj}, function (err,project) {
    console.log(project)
    if (err) {
      res.send({err: 'there are error'})
    }
    else {
      res.send(project.users)
    }
  })
})






module.exports = router;
