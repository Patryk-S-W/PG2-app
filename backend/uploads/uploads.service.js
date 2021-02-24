const db = require('../database/queries');

async function addProject({ projectId, filename }) {
	console.log(projectId, filename);
	const response = await db.pool.query(`
		INSERT INTO raports (rid, pid, time_submitted, file_path)
		VALUES (DEFAULT, $1, NOW(), $2)
		`, [projectId, filename]);
}

module.exports = {
	addProject
}
