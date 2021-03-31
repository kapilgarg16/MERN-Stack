const { truncate } = require("lodash");
const mongoose = require("mongoose");

//for assocaiative one schema into another schema
const {ObjectId} = mongoose.Schema;
const productSchema = new mongoose.Schema({
    name :  {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    description :{
        type: String,
        required: true,
        maxlength: 5000,
        trim : true
    },
    price:{
        type: Number,
        required: true,
        maxlength: 32,
        trim: true
    },
    category:{
        type : ObjectId,
        ref: "Category",
        required: true
    },
    stock:{
        type: Number,
        default:0
    },
    sold:{
        type: Number,
        default: 0
    },
    //put the photo of t-shirt
    photo:{
        data: Buffer,
        contentType: String
    }


},
{timestamps : true})

module.exports = mongoose.model("Product", productSchema);