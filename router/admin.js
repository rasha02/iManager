var express = require('express');
var adminModel=require('../models/adminModel');
var userModel=require('../models/userModel');
var db=require('../models/db');
var bodyParser = require('body-parser');

var router = express();

router.use(bodyParser.urlencoded({ extended: false }))


//************************ Get all admins ***************************
router.get('/', function (req, res) {

  adminModel.find({},function (err, result) {
    res.send(result)
  })

})



//****************** find admin by his email or password ********************

router.post('/login', function (req, res) {

  adminModel.find({email: req.query.email, password: req.query.password},function (err, admin) {

    console.log(admin)
    console.log(admin.length)
    if(admin.length!=0) {
      res.send({
        auth: true,
        id: admin[0]
      })
    }
      else(res.send({
         auth: false,

    }) )
  })

})


// ******************************* Add a new admin ******************************

router.post('/addAdmin', function (req, res) {

  console.log(req.body)

  var admin= new adminModel({name: req.query.name, email: req.query.email, password: req.query.password});
  //save the new model
  admin.save(function (err) {
    if(err){
      res.send({"state": "error"})
    }
    ///saved
    else res.send({"state": "ok"})
  })
})


//*************************** update an admin ***************************

router.put('/updateAdmin/:id', function (req, res) {
  console.log(req.body)

      adminModel.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        email: req.body.email,
        password: req.body.password

      }, {new:true}, function (err) {

        if(err){
          res.send({"state": "error"})
        }
        else res.send({"state": "ok"})
      })

})



//************************** Delete an admin ***********************

router.delete('/removeAdmin', function (req, res) {

  adminModel.remove({_id: req.body.id}, function (err) {

    if(err){
      res.send({"state": "error"})
    }
    else res.send({"state": "ok"})
  })

})





module.exports=router;
