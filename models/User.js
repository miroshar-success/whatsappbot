const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  key : {
    type : Number,
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role : {
    type : String,
    required : true,
  },
  cost_type : {
    type : String,
  },
  fcost : {
    type : Number,
  },
  ecost : {
    type : Number
  },
  whole_cost :{
    type : Number
  },
  fexpiry : {
    type : String
  },
  eexpiry : {
    type : String
  },
  expiry : {
    type : Date
  },
  rhours : {
    type : Number
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('user', UserSchema);
