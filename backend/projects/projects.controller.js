const express = require('express');
const router = express.Router();
// const Role = require('_helpers/role'); // TODO: implement _helpers/role
const db = require('../database/queries.js');
const projectService = require('./projects.service');
// const authorize = require('_helpers/authorize') // TODO: implement _helpers/authorize



router.get('/', db.getProjects);
router.get('/:pid', db.getProjectById);

router.post('/', addProject);	// TODO: dodawanie projektów
router.post('/addUser', addUserToProject);					// TODO: dodawanie użytkownika do projektu

module.exports = router;

function addProject(req, res, next) {
	projectService.addProject({...req.body, role: "student"})
    .then(error => !error ? res.sendStatus(201) : res.status(400).json({ message: error }))
    .catch(err => next(err));
}

// TODO: rejestracja
// TODO: rozgraniczenie rejestracji ze względu na rolę dodawanej osoby, autentykacja ze względu na rolę dodającego
function addUserToProject(req, res, next) {
	projectService.addUserToProject({...req.body, role: "student"})
    .then(error => !error ? res.sendStatus(201) : res.status(400).json({ message: error }))
    .catch(err => next(err));

}

