const express = require('express');
const app = express();
const mongoose = require('mongoose')


const port = 5000;
require('dotenv').config()


const uri = `mongodb+srv://${process.env.MongoUsername}:${process.env.MongoPassword}@mandalor.7j7h3mb.mongodb.net/Phone_Duck_Chatt?retryWrites=true&w=majority`;

const broadcastRoute = require("./routes/Broadcast");
const channelsRoute = require("./routes/Channels");
const authRoute = require("./routes/Auth");

//The express.json() function is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser. 
app.use(express.json()); 


app.use("/ducks/api/broadcast", broadcastRoute);
app.use("/ducks/api/channel", channelsRoute);
app.use('/ducks/api/auth', authRoute);


async function connect(){
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB...');
    } catch (error) {
      console.error(error);  
    }
}

connect();



// Start Page 
app.get('/', (req,res) => {
    res.send('<h1> Hello Start Page </h1>')
})



app.listen((port), () => {
    console.log(`Server is listening to ${port}....`)
})