const config = require('../config.js');

const Pool = require('pg').Pool
const pool = new Pool({
	user: config.dbUser,
	host: config.dbHost,
	database: config.dbDatabase,
	password: config.dbPassword,
	port: config.dbPort,
	max: 10,
	idleTimeoutMillis: 30000,
})

// login and registration
const getUserByUsername = (request, response) => {};
const getUserByUsernameAndPassword = (username, password) => {
	pool.query(`
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
		`, [username, password],
		(error, results) => {
			// do smth
		});
};

const addUser = (request, response) => {};

// API
const getUsers = (request, response) => {
	pool.query(`
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
		ORDER BY uid ASC`,
		(error, results) => {
			if (error) {
				response.status(400).json({error});
			}
			response.status(200).json(results.rows);
		});
};

const getUsersByProject = (request, response) => {
  const pid = parseInt(request.params.pid);

	// user posiada kolumnę "role", ale w ten sposób student może być leaderem grupy
	pool.query(`
		SELECT
			sq.role,
			u.uid,
			u.username,
			u.email,
			u.firstname,
			u.lastname,
			u.company,
			u.phone,
			u.role
		FROM (
			SELECT
				u.uid AS uid,
				'student' AS role
			FROM users AS u
			INNER JOIN users_have_projects AS up
			USING(uid)
			WHERE up.pid = $1
			UNION ALL
			SELECT
				supervisor_id AS uid,
				'supervisor' AS role
			FROM  projects
			WHERE pid=$1
			UNION ALL
			SELECT
				leader_id AS uid,
				'leader' AS role
			FROM  projects
			WHERE pid=$1
			UNION ALL
			SELECT
				firm_id AS uid,
				'firm' AS role
			FROM  projects
			WHERE pid=$1
		) sq
		INNER JOIN users AS u
		USING(uid)
		`, [pid],
		(error, results) => {
			if (error) {
				response.status(400).json({error});
			}
			response.status(200).json(results.rows);
		});
};

// projects
const getProjects = (request, response) => {
	pool.query(`
		SELECT
			pid,
			title,
			description,
			supervisor_id,
			leader_id,
			firm_id,
			creator_role,
			start_time,
			end_time
		FROM projects
		`,
		(error, results) => {
			if (error) {
				response.status(400).json({error});
			}
			response.status(200).json(results.rows);
		});
};

const getProjectById = (request, response) => {
  const pid = parseInt(request.params.pid);

	pool.query(`
		SELECT
			*
		FROM projects
		WHERE pid = $1
		`, [pid],
		(error, results) => {
			if (error) {
				response.status(400).json({error});
			}
			response.status(200).json(results.rows);
		});
};

const getProjectsByUserId = (request, response) => {};

const getProjectsByCreatorRole = (request, response) => {};

// comments
const getComments = (request, response) => {
	pool.query(`
		SELECT
			*
		FROM comments
		ORDER BY cid ASC
		`,
		(error, results) => {
			if (error) {
				response.status(400).json({error});
			}
			response.status(200).json(results.rows);
		});
};

const getCommentsByProjectId = (request, response) => {
  const pid = parseInt(request.params.pid);

	pool.query(`
		SELECT
			*
		FROM comments
		WHERE pid = $1
		ORDER BY time ASC
		`, [pid],
		(error, results) => {
			if (error) {
				response.status(400).json({error});
			}
			response.status(200).json(results.rows);
		});
};

// raports
const getRaports = (request, response) => {
	pool.query(`
		SELECT
			*
		FROM raports
		ORDER BY rid ASC
		`,
		(error, results) => {
			if (error) {
				response.status(400).json({error});
			}
			response.status(200).json(results.rows);
		});
};

const getRaportsByProject = (request, response) => {
  const pid = parseInt(request.params.pid);

	pool.query(`
		SELECT
			*
		FROM raports
		WHERE pid = $1
		ORDER BY rid ASC
		`, [pid],
		(error, results) => {
			if (error) {
				response.status(400).json({error});
			}
			response.status(200).json(results.rows);
		});
};

module.exports = {
	pool,
	getUserByUsername,
	getUserByUsernameAndPassword,
	addUser,
	getUsers,
	getUsersByProject,
	getProjects,
	getProjectById,
	getProjectsByUserId,
	getProjectsByCreatorRole,
	getComments,
	getCommentsByProjectId,
	getRaports,
	getRaportsByProject
}
