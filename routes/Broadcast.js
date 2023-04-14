const express = require('express');
const router = express.Router();
const BroadcastMessage = require('../models/ModelBroadcastMessage'); // Måste vara LET inte CONST då värdet ändras!
const verifyToken = require('./middleware/JWT_Auth')


// G E T 
// hämtar en lista över alla händelser som har skickats ut, ex. älgvandring, traffikolycker m.m.  
router.get('/', async (req,res) => {
    try {
       const broadcastMessage = await BroadcastMessage.find({});
        res.status(200).json(broadcastMessage);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})


// P O S T 
// skickar ut ett nytt meddelanden till en identiferad kanal som tidigare har annonserats ut.
router.post('/', verifyToken, async (req,res) => {
  try {
    const broadcastMessage = await BroadcastMessage.create(req.body);
    res.status(200).json(broadcastMessage);

  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
})

module.exports = router;