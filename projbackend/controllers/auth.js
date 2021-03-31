
//bring the user.js in auth.js
const User = require("../models/user");

const { check, validationResult } = require('express-validator');

//sign up route
exports.signup = (req, res)=>{
   
    //------------------------------------------------
    //handles json type of response use bodu parser
    // console.log("REQ BODY", req.body);

    // res.json({
    //     message : "user is signup"
    // });
    //------------------------------------------------

    const errors = validationResult(req)
    if(!error.isEmpty())
    {
        return res.status(400).json({
            error: errors.array()[0].msg
        });
    }
    //how can i save an user in DB
    const user = new User(req.body)
    user.save((err, user) => {

        if(err){
            return res.status(400).json({
                err: "Not able to save user in DB"
            });
        }
        
        //threw all the info
        // res.json(user);


        //this is the info i want to throw to the user
        res.json({
            name : user.name,
            email: user.email,
            id: user._id
        });
    })

};


//signout route
exports.signout = (req,res)=>{
    // res.send("user is signout");

    //send json message
    res.json({
        message: "User signout"
    });
};
