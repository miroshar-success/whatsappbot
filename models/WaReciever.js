const mongoose = require('mongoose');

const WaReceiverSchema = new mongoose.Schema({

  id: {
    type: Number,
  },
  user_id : {
    type : Number
  },
  instance_id : {
    type : Number,
  },
  task_id : {
    type : Number
  },
  receiver : {
    type : String
  },
  message : {
    type : String
  },
  processed : {
    type : Number
  },
  response : {
    type : String
  }
});

module.exports = mongoose.model('wareceivers', WaReceiverSchema);
