const JWT = require('jsonwebtoken');

const UserModel = require('../../models/ModelUser');
const key = process.env.KEY; // your secret key for JWT



const verifyToken =  async (req, res, next) => {
  let token = req.headers.authorization; //STOP HÄR! Fråga Jakob imorgon om hur vi ska få till JWT validering och behörighet. 
  if (!token) {
    return res.status(400).json({
        "errors": [{
            "message" : "No TOKEN found",
        }]
    })
};


token = token.replace("Bearer ", "");

 try {
    const user = JWT.verify(token, key )
    req.user = user.email 
    next()
 } catch (error) {
    return res.status(400).json({
        "errors": [{
            "message" : "Invalid TOKEN",
        }]
    })
 }
};  


module.exports = verifyToken;

