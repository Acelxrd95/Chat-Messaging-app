/** @format */
const express = require("express");
const router = express.Router();
var msgs = [
	{
		name: "Ace",
		pfp: "http://placekitten.com/32/32",
		altpfp: "Ace Profile Picture",
		msg: "Hello guys",
		attachment: null,
		trailingmsg: false,
	},
	{
		name: "Ace",
		pfp: "http://placekitten.com/32/32",
		altpfp: "Ace Profile Picture",
		msg: "wsup",
		attachment: null,
		trailingmsg: false,
	},
	{
		name: "Moahmed",
		pfp: "http://placekitten.com/32/32",
		altpfp: "Moahmed Profile Picture",
		msg: "Wssup",
		attachment: null,
		trailingmsg: false,
	},
];

io.on("connection", (socket) => {
	console.log("a user connected");

	socket.on("disconnect", (socket) => {
		console.log("a user disconnected");
	});

	socket.on("message", (message) => {
		io.emit("message", message);
		msgs.push(message);
		console.log(msgs);
	});
});

module.exports = () => {
	router.get("/", (req, res) => {
		return res.render("chat");
	});

	router.post("/api/getmsgs", (req, res) => {
		res.send(msgs);
	});

	// router.post("/api/sendmsg", (req, res) => {
	// 	// console.log(req);
	// 	msgs.push(req.body);
	// 	console.log(msgs);
	// 	res.sendStatus(200);
	// });

	return router;
};
