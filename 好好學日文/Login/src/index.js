const express = require('express');
const pasth = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");

const app = express();
//covert data to json format
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
//static file
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

//Register User
app.post("/signup", async (req, res) => {

    const data = {
        name: req.body.username,
        password: req.body.password
    }

    //check if the user already exsists in the database
    const existingUser = await collection.findOne({ name: data.name });
    if (existingUser) {
        res.send("User already exsists. Please choose a different usename.");
    }
    else {
        //hash the password using bcrypt
        const saltRounds =10;
        const hashedPassword = await bcrypt.hash(data.password,saltRounds);

        data.password = hashedPassword;

        const userdata = await collection.insertMany(data);
        console.log(userdata);
    }


});

//login user
app.post("/login", async (req,res)=>{
    try{
        const check = await collection.findOne({name: req.body.username});
        if(!check){
            res.send("user name cannot found");
        }

        //compare the hash password from the database with the plain text
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.passwrod);
        if(isPasswordMatch){
            res.render("home");
        }
        else{
            req.send("wrong passwword");
        }
    }
    catch{
        res.send("wrong Detais")
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on Port: ${port}`);
})