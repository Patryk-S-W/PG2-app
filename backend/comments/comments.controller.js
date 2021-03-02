const express = require('express');
const router = express.Router();
const commentsService = require('./comments.service');
// const authorize = require('_helpers/authorize') // TODO: implement _helpers/authorize
// const Role = require('_helpers/role'); // TODO: implement _helpers/role

const db = require('../database/queries'); // IS THIS NEEDED HERE???

router.get('/', db.getComments);
router.get('/project/:pid', db.getCommentsByProjectId);

router.post('/project/:pid', addCommentByProject);

module.exports = router;

function addCommentByProject(req, res, next) {
  const pid = parseInt(req.params.pid);
	commentsService.addCommentByProject({...req.body, pid: pid})
    .then(error => !error ? res.sendStatus(201) : res.status(400).json({ message: error }))
    .catch(err => next(err));

}

