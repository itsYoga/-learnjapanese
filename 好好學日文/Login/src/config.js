const mongoose = require("mongoose")
const connnect = mongoose.connect("mongodb+srv://01157145:01157145@test.5ns6qr5.mongodb.net/?retryWrites=true&w=majority");


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