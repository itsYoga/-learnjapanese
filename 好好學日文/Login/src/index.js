const express = require('express');
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");

const app = express();


// Convert data to JSON format
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the "public" directory
app.use(express.static("public"));

// Assuming your images are in the "public" directory
app.use(express.static(path.join(__dirname, 'public')));


//Login button on the right up corner route
app.get('/sentence', function(req, res) {
    res.render('sentence');
});

app.get('/voc_menu', function(req, res) {
    res.render('writing/voc_menu'); 
});

//Login button on the right up corner route
app.get('/login', function(req, res) {
    res.render('login'); // Assuming your view is named 'login'
});

// Home page route
app.get("/", (req, res) => {
    res.render("login");
});


// Signup page route
app.get("/signup", (req, res) => {
    res.render("signup");
});

// Register User
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
        const userdata = await collection.insertMany(data);
        console.log("User registered with ID:", userdata.insertedId);
    }
});

// Login User
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
});
