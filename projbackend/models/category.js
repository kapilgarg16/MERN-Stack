const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    name :{
        type: String,
        trim: true,
        require: true,
        maxlength: true
    }
},
//store time and date
{ timestamps: true}
);

module.exports = mongoose.model("Category", categorySchema);