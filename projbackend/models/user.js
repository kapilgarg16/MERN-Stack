const mongoose = require("mongoose")
const crypto = require('crypto');
const uuidv1 = require('uuid/v1'); //version1

var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type : String,
        required: true,
        maxlength: 32,
        trim: true //this is a kid of filter 
        //which is use to remove spaces
    },
    lastname:{
        type : String,
        maxlength: 32,
        trim: true
    },
    email: {
        type : String,
        required: true,
        maxlength: 32,
        trim: true
    },
    userinfo:{
        type: String,
        trim: true
    },
    //Todo: please comeback here
    encry_password:{
        type: String,
        required: true
    },
    salt: String,
    role:{
        type: Number,
        default: 0
    },
    purchase : {
        type: Array,
        default :[]
    }
},
    { timestamps: true}

);
//https://www.tutorialsteacher.com/nodejs/nodejs-module-exports
//whatever we assign modulo.export will be exposed as module

// module.export = mongoose.model("User",userSchema)

//create method i schema

userSchema.virtual("password")
        .set(function(password){
            this._password = password;
            this.salt = uuidv1();
            this.encry_password = this.securePassword(password);
        })
        .get(function(){
            return this._password;
        })

userSchema.methods = {

    authenticate: function(plainpassword)
    {
        return this.securePassword(plainpassword) === this.encry_password;
    },

    securePassword: function(plainpassword){
        if(!plainpassword)
        return "";

        try{
            //change plain password into secure password
            return crypto.createHmac("sha256", this.salt)
            .update(plainpassword)
            .digest("hex");
        }
        catch (err)
        {
            return "";
        }
    }
};

module.exports = mongoose.model("User",userSchema);

