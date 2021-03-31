
//connect data base with c
require("dotenv").config();
const mongoose = require('mongoose'); 
const express = require("express") //this is for listning
const app = express();

//middlewares
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const cors = require("cors");


//for bring the auth.js in app.js
const authRoutes = require("./routes/auth");


// mongoose.connect('mongodb://localhost:27017/test',
//  {useNewUrlParser: true, useUnifiedTopology: true});

//DB connection
mongoose.connect(process.env.DATABASE,{
    //this is use to our data connection alive
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex: true

}).then(() => {
    console.log("DATA BASE CONNECTED")
});
// .catch(console.log("error is coming"));

//myfun.run().then().catch()
//then -> when data base is connected 
//catch -> when there are encountere some error
//express is require for listning

//how to use middlewares
app.use(express.json());  //https://stackoverflow.com/questions/62396498/tslint-marks-body-parser-as-deprecated
app.use(cookieParser());
app.use(cors());

//my routes
app.use("/api", authRoutes);


//port
const port = process.env.PORT || 8000;

//starting a server
app.listen(port ,() => {
    console.log(`app is running at ${port}`);
});

