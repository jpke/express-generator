var express = require('express');
var router = express.Router();
var User = require('../models/User');
var jsonParser = require('body-parser').json();

let someObject = {
  name: 'JPE',
  age: 32
};

/* GET users listing. */
router.get('/', function(req, res) {
  User.find({}).exec()
  .then(function(users) {
    res.send(users);
  })
  .catch(function(err) {
    // console.error("Server error: ", err);
    res.status(500).send("server or database error")
  });
  // res.send(someObject);
});

/* POST new user */
router.post('/', jsonParser, function(req, res) {
  let newUser = new User();
  newUser.name = req.body.name;
  newUser.age = req.body.age;
  newUser.save()
  .then(function(newUserCreated) {
    res.send(newUserCreated);
  })
  .catch(function(err) {
    // console.error("Error: ", err);
    res.status(400).send("bad request, does your post request contain a name?")
  });
});

/* PUT to update user (provide user name and age, even if unchanged) */
router.put('/', jsonParser, function(req, res) {
  if(!req.body._id) return res.status(400).send("user _id needed in body");
  User.findOneAndUpdate({_id: req.body._id},
    {$set: {
      name: req.body.name,
      age: req.body.age
      }
    },
  {new:true})
  .then(function(updatedUser) {
    res.send(updatedUser);
  })
  .catch(function(err) {
    // console.error("Server error: ", err);
    res.status(400).send("bad request, did you include user name and age?")
  });
});

/* DELETE user by _id */
router.delete('/:_id', function(req, res) {
  console.log("endpoint hit");
  if(!req.params._id) return res.status(400).send("user _id needed in url params");
  User.remove({_id: req.params._id}).exec()
  .then(function(confirmation) {
    res.send(confirmation);
  })
  .catch(function(err) {
    // console.error("Server error: ", err);
    res.status(500).send("server or database error")
  });
});

module.exports = router;
