const express = require('express');
const nunjucks = require('nunjucks');
const wol = require('wol');
const assert = require("assert");
const ping = require('ping');

require('dotenv').config();
const PORT = process.env.PORT || 8080;
const MAC = process.env.MAC;
const IP = process.env.IP;
const NAME = process.env.NAME;

assert(MAC);
assert(IP);
assert(NAME);

var app = express();
app.use(express.static("public"));
var env = nunjucks.configure("views", {
    autoescape: true,
    express: app
});

app.get("/", (req, res) => {
    try {
        res.render("index.njk", {
            name: NAME
        })
    } catch(e) {
        console.error(e);
    }
});

app.post("/yoink", (req, res) => {
    wol.wake(MAC, (err, response) => {
        if (response) {
            res.status(200).send("WOL ping sent");
        } else {
            res.status(500).send("Failed to send WOL ping")
        }
    })
});

app.get("/status", (req, res) => {
    ping.sys.probe(IP, isAlive => {
        res.status(200).send(isAlive);
    })
})

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
})