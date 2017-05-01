var mongoose = require('mongoose'), Schema = mongoose.Schema

var UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number
  }
})

var User = mongoose.model('Express-Users', UserSchema)
module.exports = User