const mongoose = require('mongoose');

const WaInstanceSchema = new mongoose.Schema({

  id: {
    type: Number,
  },
  user_id : {
    type : Number
  },
  in_id : {
    type : Number
  },
  label : {
    type : String
  },
  token : {
    type : String
  },
  url : {
    type : String
  },
  default_audience_id : {
    type : String
  },
  reminder : {
    type : String
  },
  mins : {
    type : String
  },
  public : {
    type : Number
  },
  in_use_id : {
    type : Number
  },
  started_at : {
    type : Date,
    default : Date.now()
  }
});

module.exports = mongoose.model('wainstance', WaInstanceSchema);
