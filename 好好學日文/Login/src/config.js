require('dotenv').config();
const mongoose = require("mongoose")
const connnect = mongoose.connect(process.env.MONGO_URI);


connnect.then(()=>{
    console.log("Database connected Successfully");
})
.catch(()=>{
    console.log("Database cannot be connected");
});

//create a schema
const LoginSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
});

//collection
const collection = new mongoose.model("users",LoginSchema);

module.exports= collection;