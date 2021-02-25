const db = require('../database/queries');

async function addRaport({ projectId, filename }) {
	db.pool.query(`
		INSERT INTO raports (rid, pid, time_submitted, file_name)
		VALUES (DEFAULT, $1, NOW(), $2)
		`, [projectId, filename]);
}

async function getRaportFileById(rid) {
	const response = await db.pool.query(`
		SELECT
			file_name
		FROM raports
		WHERE rid = $1
		`, [rid]);

	if (response.rows) {
		return response.rows[0];
	}
}

module.exports = {
	addRaport,
	getRaportFileById
}
