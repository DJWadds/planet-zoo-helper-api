// eslint-disable-next-line no-undef
const DB_URL = process.env.DB_URL || require("./config");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const apiRouter = require("./apiRouter");

mongoose.connect(DB_URL, 
	{ useNewUrlParser: true }, 
	() => {
		console.log(`connected to ${DB_URL}`);
	}
);

app.use(bodyParser());
app.use("/api", apiRouter);

// NO ROUTE EXISTS
app.use("/*", (req, res, next) => {
	next({ status: 404});
});

// Error handling
app.use((err, req, res, next) => {
	if (err.status === 400) res.status(400).send({message: "Bad Request"});
	else next(err);
});

app.use((err, req, res, next) => {
	if (err.status === 404) res.status(404).send({message: "Bad Route"});
	else next(err);
});

app.use((err, req, res) => {
	res.status(500).send({message: "Server Issue"});
});

module.exports = app;