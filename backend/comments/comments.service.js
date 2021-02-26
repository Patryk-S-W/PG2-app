// const Role = require('_helpers/role'); // TODO: implement _helpers/role
const db = require('../database/queries');

async function addCommentByProject({ pid, uid, content }) {
	// TODO: add roles

	if (!uid) {
		return "Brak id użytkownika wysyłającego wiadomość";
	} else if (!content || content.length === 0) {
		return "Brak treści komentarza";
	}

	try {
		await db.pool.query(`
			INSERT INTO comments(cid, pid, uid, time, content) VALUES
				(DEFAULT, $1, $2, NOW(), $3)
			`, [ pid, uid, content ]);
	} catch (error) {
		if (error.code === '23505') {
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
	addCommentByProject
}
