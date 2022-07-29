const mongoose = require('mongoose');

const WaBotSchema = new mongoose.Schema({

  id: {
    type: Number,
  },
  instance_id : {
    type : Number
  },
  in_id : {
    type : Number
  },
  keyword : {
    type : String
  },
  message : {
    type : String
  },
  message_type : {
    type : String
  },
  file : {
    type : String
  },
  file_mime_type : {
    type : String
  },
  skid : {
    type : Number
  }
  
});

module.exports = mongoose.model('wabots', WaBotSchema);
