const express = require("express");
const mongoose = require("mongoose");
const contactModel = require("./models/contact")

let app = express();

let port = process.env.PORT || 3000;

const mongo_url = process.env.MONGODB_URL;
const mongo_user = process.env.MONGODB_USER;
const mongo_password = process.env.MONGODB_PASSWORD;

const url = "mongodb+srv://"+mongo_user+":"+mongo_password+"@"+mongo_url+"/contactdatabase?retryWrites=true&w=majority";

mongoose.connect(url).then (
    () => console.log("Connected to MongoDB"),
    (error) => console.log("Failed to connect to MongoDB. Reason",error)
)

app.get("/api/contact",function(req,res) {
    contactModel.find().then(function(contacts) {
        return res.status(200).json(contacts)
    }).catch(function(err) {
        console.log("Database returned an error.",err)
        return res.status(500).json({"Message":"Internal server error"})
    })
})

app.listen(port);

console.log("Running in port",port);