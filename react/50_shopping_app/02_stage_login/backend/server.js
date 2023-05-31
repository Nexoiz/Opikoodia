const express = require("express");
const mongoose = require("mongoose");
const shoppingRoute = require("./routes/shoppingroute");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const userModel = require("./models/user");
const sessionModel = require("./models/session");

let app = express();

app.use(express.json());

const mongo_url = process.env.MONGODB_URL;
const mongo_user = process.env.MONGODB_USER;
const mongo_password = process.env.MONGODB_PASSWORD;

let port = process.env.PORT || 3001

const url = "mongodb+srv://"+mongo_user+":"+mongo_password+"@"+mongo_url+"/shoppingdatabase?retryWrites=true&w=majority";

mongoose.connect(url).then(
	() => console.log("Connected to MongoDB"),
	(error) => console.log("Failed to connect to MongoDB. Reason",error)
)

//LOGIN API
app.post("/register",function(req,res) {
	if(!req.body) {
		return res.status(400).json({"Message":"Bad Request"});
	}
	if(!req.body.username || !req.body.password) {
		return res.status(400).json({"Message":"Bad Request"});
	}
	if(req.body.username.length < 4 || req.body.password.length > 8) {
		return res.status(400).json({"Message":"Bad Request"});
	}
	bcrypt.hash(req.body.password,14,function(err,hash) {
		if(err) {
			console.log(err);
			return res.status(500).json({"Message":"Internal server error"});
		}
		let user = new userModel({
			"username":req.body.username,
			"password":hash
		})
		user.save().then(function(user) {
			return res.status(200).json({"Message":"Register success"});
		}).catch(function(err) {
			if(err.code === 11000) {
				return res.status(409).json({"Message":"Username is already in use"});
			}
			console.log(err);
			return res.status(500).json({"Message":"Internal server error"});
		})
	})
})

app.use("/api",shoppingRoute);

app.listen(port);
console.log("Running in port",port);