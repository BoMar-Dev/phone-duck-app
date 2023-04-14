const express = require('express');
const router = express.Router();
const UserModel = require('../models/ModelUser');
const bcrypt = require("bcrypt");
const JWT = require('jsonwebtoken');
const key = process.env.KEY;


const { check, validationResult } = require('express-validator');

// S I G N U P    R O U T E

// Använder express-validator struktur
router.post('/signup', [
    check("email", "Please provide a valid email")
        .isEmail(),
    check("password", "Please provide a password that is greater than 5 characters and contains at least 1 upper case character")
        .isLength({
            min: 6 
        })
        // .isUppercase({
        //     min: 1
        // })
        
], async (req, res) => { // Tar tid för den att gå igenom mail och lösenord innan den går vidare
    
    
   let userModel = await UserModel.findOne({email: req.body.email})
    
        
    const errors = validationResult(req); // fråga Jakob

    if(!errors.isEmpty()) { // Kollar efter fel i vår setup för lösenord och epost i .isEmail & is.Lenght & .isUppercase
        return  res.status(400).json({ // bad request error 
            errors: errors.array() //checks array, line 7 in code
        })
    }
    
    
    if(userModel){
        return res.status(400).json({
            "errors": [{
                "message" : "This user already exists",
            }]
        })
    }
        
    
    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    userModel = await UserModel.create({ email: req.body.email, password: hashedPassword });

        console.log(hashedPassword, ':<- hashed password')
  
    
    const token = JWT.sign({  /// Fråga jakob om denna del 
        email: req.body.email
    }, key, {
        expiresIn: 3600 // 1h
    })
    
    res.json({
        token: token 
    })

    console.log('Validation passed')

});


// L O G I N     R O U T E

router.post('/login', async (req, res) => {
    let userModel = req.body
    
    userModel = await UserModel.findOne({email: req.body.email})

    console.log(userModel)

    if(!userModel){
        return res.status(400).json({
            "errors": [{
                "message" : "Bad Credentials",
            }]
        })
    };
    
    const isPasswordMatch = await bcrypt.compare(req.body.password, userModel.password);
    
    console.log(isPasswordMatch)
    // console.log(req.body.password)
    console.log(userModel.password)


    if(!isPasswordMatch){
        return res.status(400).json({
            "errors": [{
                "message": "invalid Credentials"
            }
        ]
        })
    };

    const token = JWT.sign({
        email: req.body.email
    }, key, {   
        expiresIn: 3600 // 1h
    })
    
    res.status(200).json({ 
        "message": "Login Successfull",
        token: token
    })

});

module.exports = router; 


/*
Saker att göra: 

    - Fixa behörighet med JWT - Prata med Jakob imorgon fredag
    - Skicka meddelande till specifik kanal
    - Hämta alla meddelanden från specifik kanal
    - Justera alla routes, duck/api/.....

*/