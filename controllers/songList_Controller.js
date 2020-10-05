
song_List = require('../models/songList_Model');

exports.index = function (req, res) {
	song_List.find({}, function (err, songList) {
		if (err) {
			res.json({
				status: "error",
				message: err,
			});
		}
		res.json(song_List);
	});
};

exports.new = function (req, res) {
	var songList = new song_List();
	songList.songs = req.body.songs ? req.body.songs : songList.songs;
	songList.date = req.body.date;
	songList.note = req.body.note;
	songList.members = req.body.members;

	songList.save(function (err) {
		if (err)
			res.json(err);
		res.json(songList);
	});
};

exports.view = function (req, res) {
	song_List.findById(req.params.songList_id, function (err, songList) {
		if (err)
			res.send(err);
		res.json(songList);
	});
};

exports.update = function (req, res) {
	song_List.findById(req.params.songList_id, function (err, songList) {
		if (err)
			res.send(err);
		songList.songs = req.body.songs ? req.body.songs : songList.songs;
		songList.date = req.body.date;
		songList.note = req.body.note;
		songList.members = req.body.members;

		songList.save(function (err) {
			if (err)
				res.json(err);
			res.json(songList);
		});
	});
};

exports.delete = function (req, res) {
	song_List.deleteOne({
		_id: req.params.songList_id
	}, function (err, songList) {
		if (err)
			res.send(err);
		res.json({
			status: "success"
		});
	});
};