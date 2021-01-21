const check = require('express-validator/check');
SongList = require('../models/songList');

exports.index = async (req, res) => {
	res.json(await SongList.find({}));
};

exports.createOrUpdate = async (req, res) => {
	// await check.check('songs').notEmpty().run(req);
	await check.check('members').notEmpty().run(req);
	await check.check('date').notEmpty().run(req);

	const result = check.validationResult(req);
	if (!result.isEmpty()) {
		return res.status(400).json({ errors: result.array() });
	}

	const songList = req.params.id ? await SongList.findById(req.params.id) : new SongList();
	// songList.songs = req.body.songs;
	songList.members = req.body.members;
	songList.date = req.body.date;
	songList.note = req.body.note;

	res.json(await songList.save());
};

exports.view = async (req, res) => {
	res.json(await SongList.findById(req.params.id));
};

exports.delete = async (req, res) => {
	await SongList.deleteOne({_id: req.params.id});
	res.json();
};
