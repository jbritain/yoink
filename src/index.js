const express = require('express');
const nunjucks = require('nunjucks');
const wol = require('wol');
const assert = require("assert");
const ping = require('ping');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const bodyParser = require('body-parser');

const messages = require("./messages.json"); // list of messages to put on the button

function select(arr){ // select random node from array
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateToken(key){ // hash password into a token
    return crypto.Hash("sha256").update(key).digest("hex");
}

function checkAuth(token){ // compares hash of token to hash of password from env. If password is blank, authentication is automatically true
    return (token === generateToken(PASSWORD)) || (PASSWORD === ""); 
}

require('dotenv').config();
const PORT = process.env.PORT || 8080;
const MAC = process.env.MAC;
const IP = process.env.IP;
const NAME = process.env.NAME;
const PASSWORD = process.env.PASSWORD || "";

assert(MAC);
assert(IP);
assert(NAME);

var app = express();
app.use(express.static("public"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
var env = nunjucks.configure("views", {
    autoescape: true,
    express: app
});

app.get("/", (req, res) => {
    const message = select(messages.messages); // randomly pick a message to show on the button
    try {
        const token = req.cookies.token || "";
        if (!checkAuth(token)){
            res.redirect(302, "/auth"); // if not authenticated, redirect to login page
        } else {
            res.render("index.njk", {
                name: NAME,
                message: message
            })
        }        
    } catch(e) {
        console.error(e);
    }
});

app.get("/auth", (req, res) => {
    try {
        res.render("auth.njk")
    } catch(e) {
        console.error(e);
    }
})

app.post("/auth", (req, res) => {
    try {
        const password = req.body.password;
        if (checkAuth(generateToken(password))){ // check if correct password
            res.cookie("token", generateToken(password));
            res.redirect("/");
        } else {
            res.redirect("/auth?invalid=true")
        }
        
    } catch(e) {
        console.error(e);
    }
    
})

app.post("/yoink", (req, res) => { // send WOL ping
    try {
        if (checkAuth(req.cookies.token)){
            wol.wake(MAC, (err, response) => {
                if (response) {
                    res.status(200).send("WOL ping sent");
                } else {
                    res.status(500).send("Failed to send WOL ping")
                }
            })
        } else {
            res.status(401).send("unauthenticated request")
        }
    } catch(e) {
        console.error(e)
    }
});

app.get("/status", (req, res) => { // check if device is online
    try {
        if(checkAuth(req.cookies.token)){
            ping.sys.probe(IP, isAlive => {
                res.status(200).send(isAlive);
            })
        } else {
            res.status(401).send("unauthenticated request")
        }
        
    } catch(e) {
        console.error(e);
    }
    
})

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
})