// const express = require("express") -- non typescript version
import express from "express"; //typescript version
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";

const app = express();

//middleware
//cors
app.use(cors());
//morgan to log requests to console
app.use(morgan("dev"));
//allow client to send json
app.use(express.json());
//allow client to send url encoded data
app.use(express.urlencoded({ extended: true }));

//routes
app.get("/", (req, res, next) => {
	res.json({ message: "hello" })
	// setTimeout(() => {
	// 	next(new Error("hello"));
	// }, 1);
	// //log to console
	// console.log("hello from express");
	// //set status code
	// res.status(200);
	// //return json message
	// res.json({ message: "hello" });
	// //to send back an html file below
	// // res.sendFile(path.resolve("pages/index.html"))
});

//use router
app.use("/api", protect, router);

app.post('/user', createNewUser);
app.post('/signin', signin);

app.use((err, req, res, next) => {
	if (err.type === 'auth') {
		res.status(401).json({ message: 'unauthorized' })
	} else if (err.type === 'input') {
		res.status(400).json({ message: 'invalid input' })
	} else {
		res.status(500).json({ message: 'oops, thats on us' })
	}
});

//export app for index.js
// module.exports = app -- non typescript version
export default app; //typescript version
