const config = require('../config.js');
const jwt = require('jsonwebtoken');
// const Role = require('_helpers/role'); // TODO: implement _helpers/role
const db = require('../database/queries');

// queries go here
async function authenticate({ username, password }) {
	response = await db.pool.query(`
		SELECT
			uid,
			username,
			email,
			firstname,
			lastname,
			company,
			phone,
			role
		FROM users
		WHERE username = $1
		AND password = $2
		`, [username, password]);

	if (response.rows.length === 1) {
		const user = response.rows[0];
		const token = jwt.sign({ sub: user.id, role: user.role }, config.secret, {
		      expiresIn: config.tokenExpireTime
		  });
		const { password, ...userWithoutPassword } = user;
		userWithToken = {
		    ...userWithoutPassword,
		    token
		};
		console.log("user:", userWithToken);
		return userWithToken;
	}
	// query
}

async function register({ username, password, email, firstname, lastname, role, company, phone }) {
	// TODO: add roles
	// TODO: Add checking for special symbols, so there are no weird usernames

	if (password.length === 0) {
		return "Hasło nie może być puste";
	}
	if (!/.+?@.+?\..+?/.test(email)) {
		return "Podany e-mail jest niepoprawny";
	}

	try {
		response = await db.pool.query(`
			INSERT INTO users(username, password, email, firstname, lastname, role, company, phone, date_created) VALUES
				($1, $2, $3, $4, $5, $6, $7, $8, NOW())
			`, [ username, password, email, firstname, lastname, role, company, phone ]);
	} catch (error) {
		if (error.code === '23505') {	// key already exists error code
			column = error.detail.match(/\((.*?)\)=\(.*?\)/)[1];
			if (column === 'username') {
				return "Użytkownik z taką nazwą już istnieje.";
			} else if (column === 'email') {
				return "Na podany e-mail został już zarejestrowany użytkownik.";
			}
		} else {
			throw error;
		}
	}
}

module.exports = {
	authenticate,
	register
}
