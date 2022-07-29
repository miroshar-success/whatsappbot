const mongoose = require('mongoose');

const WaDataSchema = new mongoose.Schema({

  id: {
    type: Number,
  },
  in_id : {
    type : Number,
  },
  client_text : {
    type : String
  },
  bot_text : {
    type : String
  },
  name : {
    type : String
  },
  project_name : {
    type : String
  },
  data_type : {
    type : String
  },
  response_type : {
    type : String
  },
  client_number : {
    type : String
  },
  reminder_processed : {
    type : Number
  },
  ofir : {
    type : Number
  },
  ofir1 : {
    type : Number
  }
});

module.exports = mongoose.model('wadata', WaDataSchema);
