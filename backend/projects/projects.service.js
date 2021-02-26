// const Role = require('_helpers/role'); // TODO: implement _helpers/role
const db = require('../database/queries');

// queries go here
async function addProject({title, creator_role, supervisor_id, leader_id, firm_id, description, start_time, end_time}) {
	console.log(title, creator_role, supervisor_id, leader_id, firm_id, description, start_time, end_time);

	if ((!title || title === "") || (!description || description === "")) { return "Pola \"tytuł\" i \"opis\" projektu nie mogą być puste" }

	try {
		await db.pool.query(`
			INSERT INTO projects(pid, title, creator_role, supervisor_id, leader_id, firm_id, description, start_time, end_time) VALUES
				(DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8)
			`, [title, creator_role, supervisor_id, leader_id, firm_id, description, start_time, end_time]);
	} catch (error) {
		// handle errors
		throw error;
	}
}

async function addUserToProject({ userId, projectId }) {
	try {
		// TODO: Prevent inserting duplicates?
		await db.pool.query(`
			INSERT INTO users_have_projects(uid, pid) VALUES
				($1, $2)
			`, [userId, projectId]);
	} catch (error) {
		console.log(error);
		if (error.code === '23503') {	// key constraint doesn't exist
			column = error.detail.match(/\((.*?)\)=\(.*?\)/)[1];
			if (column === 'uid') {
				return "Podany użytkownik nie istnieje";
			} else if (column === 'pid') {
				return "Podany projekt nie istnieje";
			}
		} else {
			throw error;
		}
	}
}

module.exports = {
	addProject,
	addUserToProject
}
