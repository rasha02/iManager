var express = require('express');
var multer = require('multer');
var projectModel=require('../models/projectModel');
var userModel=require('../models/userModel');
var db=require('../models/db');

var router = express();

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './filesUploaded')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now()+file.originalname)
  }
});
var upload = multer({storage: storage});



//************************ Get all projects *********************************

router.get('/', function (req, res) {
  projectModel.find({},function (err, result) {
    res.send(result)
  })
})

//************************ Delete a project **********************************

router.delete('/removeProject', function (req, res) {
  console.log(req.query)
  projectModel.remove({_id: req.body.id}, function (err) {

    if(err){
      res.send({"state": "error"})
    }
    else res.send({"state": "ok"})
  })

})


// *******************************
router.get('/removeProjFromListProjByUser', function (req , res) {

  userModel.findById(req.query.idUser, function (err, user) {
    var listproj = []
    this.listproj = []

    for(var i=0; i < user.projs.length; i++)
    {
        if (user.projs[i]._id != req.query.idproj){
           this.listproj.push(user.projs[i])

        }
    }

    user.projs= this.listproj

    user.save(function (err) {
      if (err) {
        res.send({state: false})
      }
      else {
        //res.send({state: true})
      }
    })

  })

  projectModel.findById(req.query.idproj, function (err, projet) {
    console.log(projet)
    var newuser = []
    this.newuser = []
    for (var j = 0; j < projet.users.length; j++) {

      if (projet.users[j]._id != req.query.idUser) {
        this.newuser.push(projet.users[j])
      }

    }
    projet.users = this.newuser

    projet.save(function (err) {
      if (err) {
        res.send({state: false})
      }
      else {
        res.send({state: true})
      }
    })
  })


})



//************************* Create a new project just his name ***************************************

router.post('/addProject', function (req, res) {
   var  project= new projectModel({name: req.query.name});
    project.save(function (err) {
      console.log(err)
      if(err) {
        res.send({state:false})
      }
      else {
        res.send({state:true})
      }
    })
})

//************************* Create a new project And affect user ***************************************

router.post('/addProject/:idUser', function (req, res) {
  userModel.findById({_id: req.params.idUser}, function (err,user) {
    console.log(user);
    var  project= new projectModel({name: req.body.name, users: user});
    project.save(function (err) {
      console.log(err)
      if(err) {
        res.send({state:false})
      }
      else {
        res.send({state:true})
      }
    })
  })
})

// *****************************

router.put('/updateProject/:id', function (req, res) {
  console.log(req.body)
  projectModel.findByIdAndUpdate(req.params.id,{name: req.body.name,}, {new:true}, function (err, project) {
    if(err){
      res.send({"state": "error"})
    }
    else {
      for (var i=0;i<project.users.lenght;i++) {
        userModel.findById(project.users[i]._id, function (req, user) {
          console.log(user);
        user.projs.findOneAndUpdate(req.param.id, {name: req.body.name}, function (err) {
          if (err) res.send({"state": "error"})
          else res.send({"state": "ok"})
        })
      })
    }
      res.send({"state": "ok"})
    }
  })

})

//****************************** affect another user to a project  ***************************

router.post('/affectUserToProj/:idUser',function (req,res) {

  projectModel.findById(req.query.idProj , function (err,project) {
    if(err){
      res.send({err:'there are error'})
    }
    else
    {
      userModel.findById({_id: req.params.idUser}, function (err,user) {
        console.log("project:",project);
          project.users.push(user)
          user.projs.push(project)
          project.save(function (err) {
            //console.log(err)
            if(err){
              res.send({state:false})
              throw err;
            }
            else{
              user.save(function (err) {
                //console.log(err)
                if(err){
                  res.send({state:false})
                  throw err;
                }
                else{
                  res.send({state:true})
                }
              })

            }
          })
      })
    }
  })
})

//************************* Get list users working in the same project ************************

router.get('/listUsersByProject', function (req, res) {
  projectModel.findById({_id: req.query.idProj}, function (err,project) {
    if (err) {
      res.send({err: 'there are error'})
    }
    else {
        res.send(project.users)
      }
     })
})

//************************* Get list projects by User ************************

router.get('/listProjsByUser', function (req, res) {
  userModel.findById({_id: req.query.idUser}, function (err,user) {
    if (err) {
      res.send({err: 'there are error'})
    }
    else {
      res.send(user.projs)
    }
  })
})


//************************* Get number of days in a month ************************

var getDaysInMonth = function(month,year) {
  // Here January is 1 based
  //Day 0 is the last day in the previous month
  return new Date(year, month, 0).getDate();
// Here January is 0 based
// return new Date(year, month+1, 0).getDate();
};
router.get('/DaysInMonth',function (req,res) {
   let date =new Date()
  var numbDay=getDaysInMonth(date.getMonth(), date.getFullYear());
   res.send({'number day':numbDay})
})



// ************************** affect an activity to a document *********************

router.post('/activityToDoc', function (req, res) {
  projectModel.findById(req.body.idProj, function (err, project) {
    if (err) {
      res.send({err: 'there are error'})
    }
    else {
      project.document.activity.push({
        day:req.body.day,
        presence:req.body.presence
      })
      project.save(function (err) {
        if(err){
          res.send({state:false})
          throw err;
        }
        else{
          res.send({state:true})
        }
      })
    }
  })
})

// ************************** upload files to a document ***************************

router.post('/uploadFilesToDoc', upload.array("uploads[]",12),function (req, res) {
  projectModel.findById(req.body.idProj, function (err, project) {
    if (err) {
      res.send({err: 'there are error'})
    }
    else {
   for(var c=0;c<project.document;c++){
     if(project.document[c].month==req.body.month &&  project.document[c].year==req.body.year ){
       project.document[c].files.push(
         {filename:req.files[0].filename}
       )
     }
   }
      project.save(function (err) {
        if(err){
          res.send({state:false})
          throw err;
        }
        else{
          res.send({state:true})
        }
      })
    }
  })
})



module.exports=router;
