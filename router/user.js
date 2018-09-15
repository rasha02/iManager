var express = require('express');
var userModel = require('../models/userModel');
var projectModel = require('../models/projectModel');
var docModel = require('../models/docModel');
var db = require('../models/db');


var router = express();


//Get all users
router.get('/', function (req, res) {

  userModel.find({}, function (err, result) {
    res.send(result)
  })

})

// find user by his lastName
router.get('/bylastName', function (req, res) {

  userModel.find({name: req.body.name}, function (err, result) {
    res.send(result)
  })

})

// Find user by a key word
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

router.put('/updateUserPost', function (req, res) {
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

  userModel.findById(req.query.id , function(err , result) {
    for (var i = 0; i < result.projs.length; i++) {

      projectModel.findById(result.projs[i]._id, function (err, projet) {
        console.log(projet)
        var newuser = []
        this.newuser = []
        for (var j = 0; j < projet.users.length; j++) {

          if (projet.users[j]._id != req.query.id) {
            this.newuser.push(projet.users[j])
          }

        }
        projet.users = this.newuser

        projet.save(function (err) {
          if (err) {
            res.send({state: false})
          }
          else {
            //res.send({state: true})
          }
        })
      })

      if(i== result.projs.length - 1){
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









// **************************** Get projects by user**************************

router.get('/listProjByUser', function (req, res) {

  userModel.findById(req.query.idUser, function (err, user) {
    console.log(user)
    if (err) {
      res.send({err: 'there are error'})
    }
    else {

        console.log(user.projs)
        res.send(user.projs)

    }
  })
})

//**************************** Add new Doc *****************************

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







router.get('/findById', function (req, res) {

  userModel.findById({_id: req.body.id}, function (err, result) {

    res.send(result)
  })

})


/*
router.get('/addP/:name', function (req, res) {
    res.send("WELCOME "+req.params.name)
})

router.post('/post', function (req, res) {
    res.send("WELCOME USER "+ req.query.name)
})

router.post('/postB', function (req, res) {
    res.send("WELCOME USER "+ req.body.name)
})
*/


module.exports = router;
