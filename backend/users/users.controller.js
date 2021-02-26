const express = require('express');
const router = express.Router();
const userService = require('./user.service');
// const authorize = require('_helpers/authorize') // TODO: implement _helpers/authorize
// const Role = require('_helpers/role'); // TODO: implement _helpers/role

const db = require('../database/queries'); // IS THIS NEEDED HERE???

router.get('/', db.getUsers);
router.get('/project/:pid', db.getUsersByProject);

router.post('/authenticate', authenticate);	// public route
router.post('/register', register);					// public route
// router.get('/', authorize(Role.Admin), getUsers);	// admin only
// router.get('/:id', authorize(), getUserById);       // all authenticated users
module.exports = router;

function authenticate(req, res, next) {
  userService.authenticate(req.body)
    .then(user => user ? res.json(user) : res.status(400).json({ message: 'Nazwa użytkownika lub hasło jest niepoprawne.' }))
    .catch(err => next(err));
}

// TODO: rozgraniczenie rejestracji ze względu na rolę dodawanej osoby, autentykacja ze względu na rolę dodającego
function register(req, res, next) {
	userService.register({...req.body, role: "student"})
    .then(error => !error ? res.sendStatus(201) : res.status(400).json({ message: error }))
    .catch(err => next(err));

}

