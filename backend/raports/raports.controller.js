const fs = require('fs');
const express = require('express');
const router = express.Router();
const multer = require('multer');

const db = require('../database/queries.js');
const uploadsService = require('./raports.service.js');

const bannedExtensions = ["exe", "bat"];

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		// cb(null, process.env.UPLOAD_DIR)
		cb(null, 'uploads')
	},
	filename: function(req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname)
	}
})

router.get('/id/:rid', getRaportFileById);
router.post('/upload', fileUpload);
router.post('/raport', addRaportToProject);

module.exports = router;

function fileFilter(req, file, cb) {
	var splits = file.originalname.split(".");
	var fileExtension = splits[splits.length - 1];

	if (bannedExtensions.some(extension => extension === fileExtension)) {
		// file extension is banned
		cb(null, false);
	} else {
		// accept file
		cb(null, true);
	}
}

const upload = multer({
	fileFilter: fileFilter,
	storage: storage
}).single('file')

function fileUpload(req, res) {
	upload(req, res, function(err) {
		if (err instanceof multer.MulterError) {
			return res.status(500).json(err);
		} else if (err) {
			return res.status(500).json(err);
		}

		if (req.file) {
			return res.sendStatus(201);
		} else {
			// TODO: Zbanowane pliki nie dostają 409, mimo, że ten kod się wykonuje
			return res.status(409).json({ message: "Niepoprawne rozszerzenie pliku." });
		}
	});
}

function addRaportToProject(req, res, next) {
	uploadsService.addProject(req.body)
	  .then(error => !error ? res.sendStatus(201) : res.status(400).json({ message: error }))
	  .catch(err => next(err));
}

function getRaportFileById(req, res, next) {
  const rid = parseInt(req.params.rid);
	// var path = process.env.UPLOAD_DIR;
	var path = 'uploads';
	if (path[path.length - 1] !== '/') {
		path = path + '/';
	}

	uploadsService.getRaportFileById(rid)
	  .then((msg) => {
			msg.file_name ? res.download(path + msg.file_name) : res.status(400).json({ message: "Nie znaleziono takiego raportu" })
		})
	  .catch(err => next(err));
}
