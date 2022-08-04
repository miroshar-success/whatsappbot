const mongoose = require('mongoose');

const WaBotWelcomeSchema = new mongoose.Schema({

  id: {
    type: Number,
  },
  in_id : {
    type : Number
  },
  chat_id : {
    type : String
  },
  source : {
    type : String
  },
  source_id : {
    type : Number
  },
  fbapi_response :{
    type : String
  },
  reminder_processed :{
    type : Number
  },
  created_at : {
    type : Date,
    default : Date.now()
  },
  updated_at : {
    type : Date,
    default : Date.now()
  },
  ofir : {
    type : Number
  },
  doron : {
    type : Number
  },
  david : {
    type : Number
  },
  google : {
    type : Number
  },
  clicks : {
    type : Number
  }
  
});

module.exports = mongoose.model('wabotwelcome', WaBotWelcomeSchema);
