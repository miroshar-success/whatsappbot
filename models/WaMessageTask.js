const mongoose = require('mongoose');

const WaMessageTaskSchema = new mongoose.Schema({

  id: {
    type: Number,
  },
  user_id : {
    type : Number
  },
  instance_id : {
    type : Number
  },
  delay : {
    type : String
  },
  pause : {
    type : String
  },
  iterations : {
    type : String
  },
  message : {
    type : String
  },
  enable : {
    type : Number
  },
  iterations_processed : {
    type : Number
  },
  next_processed_in : {
    type : String
  }
});

module.exports = mongoose.model('wamessagetask', WaMessageTaskSchema);
