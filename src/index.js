const express = require('express');
const nunjucks = require('nunjucks');
const wol = require('wol');
const assert = require("assert");

require('dotenv').config();
const PORT = process.env.PORT || 8080;
const MAC = process.env.MAC;

assert(MAC);

var app = express();
app.use(express.static("public"));
var env = nunjucks.configure("views", {
    autoescape: true,
    express: app
});

app.get("/", (req, res) => {
    try {
        res.render("index.njk")
    } catch(e) {
        console.error(e);
    }
});

app.post("/yoink", (req, res) => {
    wol.wake(MAC, (err, res) => {
        console.log(res);
    })
})

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
})