const mongoose = require('mongoose');



const channelSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please enter a channel name']
    },
    messages: [
      {
        email: { type: String, required: true },
        message: { type: String, required: true },
        timestamp: { type: Date, default: Date.now }
      }
    ]
  });





const ChannelModel = mongoose.model('Channels', channelSchema);

module.exports = ChannelModel;



  