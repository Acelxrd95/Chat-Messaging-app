/** @format */

const passport = require("passport");
const local_strategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function initialize(passport, getuser_email, getuser_id) {
	const authenticate_user = async (email, password, done) => {
		const user = getuser_email(email);
		if (user == null) {
			return done(null, false, { message: "No user with that email" });
		}

		try {
			if (await bcrypt.compare(password, user.password)) {
				return done(null, user);
			} else {
				return done(null, false, { message: "Password incorrect" });
			}
		} catch (err) {
			return done(err);
		}
	};
	passport.use(
		new local_strategy({ usernameField: "email" }, authenticate_user)
	);
	passport.serializeUser((user, done) => done(null, user.id));
	passport.deserializeUser((id, done) => {
		return done(null, getuser_id(id));
	});
}
module.exports = initialize;
