const mongoose = require("mongoose")
const connnect = mongoose.connect("mongodb://localhost:27017/Login-tut");


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