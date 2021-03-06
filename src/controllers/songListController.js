const check = require('express-validator/check');
const SongList = require('../models/songList');
const Member = require('../models/member');
const Song = require('../models/song');

const fetchRelations = async (songLists) => {
	const entities = {
		members: await Member.find({}),
		songs: await Song.find({}),
	};

	const lists = Array.isArray(songLists) ? songLists : [songLists];
	lists.forEach((songList) => {
		for (const field of ['members', 'songs']) {
			songList[field] = songList[field] ?? [];
			songList[field] = songList[field].map((entityId) => {
				const index = entities[field].findIndex(entity => entity._id.equals(entityId));
				return entities[field][index];
			});
		}
	});

	return songLists;
}

exports.index = async (req, res) => {
	res.json(await fetchRelations(await SongList.find({})));
};

exports.createOrUpdate = async (req, res) => {
	await check.check('songs').notEmpty().run(req);
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

	res.json(await fetchRelations(await songList.save()));
};

exports.view = async (req, res) => {
	res.json(await fetchRelations(await SongList.findById(req.params.id)));
};

exports.delete = async (req, res) => {
	await SongList.deleteOne({_id: req.params.id});
	res.json();
};
