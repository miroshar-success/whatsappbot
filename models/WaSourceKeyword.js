const mongoose = require('mongoose');

const WaSourceKeyWordSchema = new mongoose.Schema({

  id: {
    type: Number,
  },
  in_id : {
    type : Number,
  },
  keyword :{
    type : String
  },
  bot_id : {
    type : Number
  },
  instance_id : {
    type : Number
  },
  audience_id : {
    type : String
  },
  type : {
    type : String
  }
});

module.exports = mongoose.model('wasourcekeyword', WaSourceKeyWordSchema);
