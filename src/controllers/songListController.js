const check = require('express-validator/check');
const SongList = require('../models/songList');
const Member = require('../models/member');
const Song = require('../models/song');

exports.index = async (req, res) => {
	const lists = await SongList.find({});
	const members = await Member.find({});

	lists.forEach(list => {
		list.members = list.members ?? [];
		list.members = list.members.map((memberId) => {
			const index = members.findIndex(member => member._id.equals(memberId));
			return members[index];
		});
	});

	// res.json(lists);

	const songs = await Song.find({});

	lists.forEach(list => {
		list.songs = list.songs ?? [];
		list.songs = list.songs.map((songId) => {
			const songIndex = songs.findIndex(song => song._id.equals(songId));
			return songs[songIndex];
		});
	});

	res.json(lists);
};

exports.createOrUpdate = async (req, res) => {
	await check.check('songs').notEmpty().run(req);
	await check.check('members').notEmpty().run(req);
	await check.check('date').notEmpty().run(req);

	const result = check.validationResult(req);
	if (!result.isEmpty()) {
		return res.status(400).json({ errors: result.array() });
	}

	const songList = req.params.id ? await SongList.findById(req.params.id) : new SongList();
	songList.songs = req.body.songs;
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
