/** @format */
/* ----------- ANCHOR Module and Server Variables Initializations ----------- */
const express = require("express");
// const flash = require("express-flash");
// const session = require("express-session");

const app = express();

const http = require("http").Server(app);
global.io = require("socket.io")(http);
const mysql = require("mysql");
const path = require("path");
// const bcrypt = require("bcrypt");
// const passport = require("passport");
const sassMiddleware = require("node-sass-middleware");
const morgan = require("morgan");
const routes = require("./routes");
const port = 50000;

/* ------------------------ ANCHOR Express app setup ------------------------ */
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("combined"));
app.use(
	sassMiddleware({
		src: __dirname + "/public/styles/sass",
		dest: __dirname + "/public/styles",
		// debug: true,
		outputStyle: "compressed",
		indentedSyntax: true,
		prefix: "/styles", //remove '/public' from here
	}),
	express.static(path.join(__dirname, "/public"))
);
// app.use(express.static("/public"));
// app.use(express.static("/public/css"));
// app.use(express.static("/public/img"));
// app.use(express.static("/public/js"));
app.set("views", path.join(__dirname, "./views"));
app.set("socketio", io);
app.use("/", routes());

/* ---------------- ANCHOR Server listen and Socket.io listen --------------- */
const server = http.listen(port, () => {
	console.log("server is listening on port", port);
});
