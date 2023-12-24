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
// Signup user
app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    };

    // Check if the user already exists in the database
    const existingUser = await collection.findOne({ name: data.name });
    if (existingUser) {
        res.send("User already exists. Please choose a different username.");
    } else {
        const userdata = await collection.insertOne(data);
        console.log("User registered with ID:", userdata.insertedId);
    }
});

// Login user
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });
        if (!check) {
            res.send("Username doesn't exist");
        } else {
            // Compare the plain text password from the request with the one in the database
            if (req.body.password === check.password) {
                res.render("home");
            } else {
                res.send("Wrong password");
            }
        }
    } catch (error) {
        console.error(error);
        res.send("Wrong Details");
    }
});


const port = 3000;
app.listen(port, () => {
    console.log(`Server running on Port: ${port}`);
})