const express = require('express');
const router = express.Router();
const ChannelModel = require('../models/ModelChannels');
const MessageModel = require('../models/ModelMessage');
const verifyToken = require('./middleware/JWT_Auth')

// G E T
// hämtar en lista över annonserade kanaler
router.get('/', async (req,res) => {
   try {
    const channelModel = await ChannelModel.find({}).select('-messages');    
    res.status(200).json(channelModel);

   } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message});
   }
})

// G E T 
// hämtar innehållet i en identiferad kanal som tidigare har annonserats ut, detta syftar på meddelanden som har skickats i kanalen :id 
router.get('/:id', async (req,res) => {
    try {
     const channelModel = await ChannelModel.findById(req.body.id);     
     res.status(200).json(channelModel); 
    } catch (error) {
    console.log(error.message);
    res.status(404).json({message: `Cannot find any information in channel with id : ${id}`});
    }
})


// P O S T 
// skickar ut ett nytt meddelanden till en identiferad kanal 
router.post('/:id', verifyToken, async (req,res) => {
    try {
        // Create a new message using the MessageModel
    const message = await MessageModel.create(req.body);

    const channelId = req.params.id;
    const channel = await ChannelModel.findById(channelId);

    if (!channel) {
        // Return a 404 error if the channel document is not found
        res.status(404).json({ message: `Channel with ID ${channelId} not found` });
        return;
      }

      // Add the new message to the `messages` array within the channel document
    channel.messages.push({
        email: req.body.email, // Assuming you want to store the email as the name of the sender
        message: req.body.message,
        timestamp: message.createdAt // Assuming `message` is a Mongoose document created using the `MessageModel`
      }); 

    // Save the updated channel document to the database
    await channel.save();

    // Return the new message object as the response
    res.status(200).json(message);

    } catch (error) {
      console.error(error)  
        res.status(500).json({message: error.message});   
    }
    
    // FIRST TRY 
    // try {
    //  let messageModel = await MessageModel.create(req.body);
    //  messageModel = ChannelModel.message
  
    //  //Här någonstans ska vi skicka meddelandet till specifik ID-kanal( 642ff183c5ad259be10f3d4f)
    //  res.status(200).json(messageModel);   
    // } catch (error) {
    // console.log(error.message);
    // res.status(500).json({message: error.message});
    // }
});



//P U T 
// skapar en ny kanal. Tema (rubrik) på kanalen ska skickas som en del http-body:n, förslagvis som del av ett json objekt.
router.put('/',verifyToken, async(req,res) => {
   try {
    const channelModel = await ChannelModel.create(req.body);
    res.status(200).json(channelModel);

   } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message});
   }
})


// D E L E T E
//tar bort en identiferad kanal som tidigare annonserats ut.
router.delete('/:id',verifyToken, async(req,res) => {
    try {
     const {id} = req.params;
     const channelModel = await ChannelModel.findByIdAndDelete(id); // Stop vid delete av

    if(!channelModel){
        return res.status(404).json({message: `Cannot find channel with ID ${id}`})
       }    
       res.status(200).json(channelModel)  
    
    } catch (error) {
     
      res.status(500).json({message: error.message})  
    }
})

module.exports = router;