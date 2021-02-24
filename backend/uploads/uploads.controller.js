const fs = require('fs');
const express = require('express');
const router = express.Router();
const multer = require('multer');

const db = require('../database/queries.js');
const uploadsService = require('./uploads.service');

const bannedExtensions = ["exe", "bat"];

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, "uploads")
	},
	filename: function(req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname)
	}
})

router.get('/', getRaport);
router.post('/', fileUpload);

module.exports = router;

function fileFilter(req, file, cb) {
	var splits = file.originalname.split(".");
	var fileExtension = splits[splits.length - 1];
	console.log(fileExtension);

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

function fileUpload(req, res, next) {
	console.log("fileUpload", req.body);
	upload(req, res, function(err) {
		// console.log(req.user.uid);
		console.log(req.body);
		if (req.file) {
			if (err instanceof multer.MulterError) {
				return res.status(500).json(err)
			} else if (err) {
				return res.status(500).json(err)
			} else {
				const filename = req.file.filename;
				uploadsService.addProject({ ...req.body, filename })
	  		  .then(error => !error ? res.sendStatus(201) : res.status(400).json({ message: error }))
	  		  .catch(err => next(err));
			}
		} else {
			// file extension is from the list of banned extensions
			res.status(409).json({ message: "Niepoprawne rozszerzenie pliku." });
		}
	})
}

function getRaport(req, res) {
	// GET RID FROM REQ IN SERVICE
	// QUERY DATABASE
	const path = "uploads";
	const name = 'test.txt';
	res.download('./uploads/test.txt');
}
