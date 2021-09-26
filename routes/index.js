/** @format */

const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const initialize_passport = require("../passport-config");
const methodOverride = require("method-override");

/* ---------------------- ANCHOR router initialization ---------------------- */
// const ROUTERNAMERoute = require('./ROUTERNAME');
const chatRoute = require("./chat");
const router = express.Router();

initialize_passport(
	passport,
	(email) => users.find((user) => user.email === email),
	(id) => users.find((user) => user.id === id)
);

const users = [];

router.use(flash());
router.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);
router.use(passport.initialize());
router.use(passport.session());
router.use(methodOverride("_method"));

module.exports = () => {
	router.get("/", (req, res) => {
		res.render("index");
	});

	router.get("/login", (req, res) => {
		res.render("login");
	});

	router.get("/signup", (req, res) => {
		res.render("signup");
	});

	router.use("/chat", chatRoute());
	return router;
};
