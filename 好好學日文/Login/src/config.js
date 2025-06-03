require('dotenv').config();
const mongoose = require("mongoose");

const connect = mongoose.connect('mongodb+srv://01157145:Yoga0702@cluster0.lvodstk.mongodb.net/learnjapanese?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

connect.then(() => {
    console.log("Database connected Successfully");
})
.catch((err) => {
    console.log("Database connection error:", err);
});

//create a schema
const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

//collection
const collection = new mongoose.model("users", LoginSchema);

module.exports = collection;