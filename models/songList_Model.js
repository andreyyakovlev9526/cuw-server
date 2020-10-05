var mongoose = require('mongoose');

var songList_Schema = mongoose.Schema({
	songs: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		required: true
	},
	note: {
		type: String
	},
	members: {
		type: String,
		required: true
	}
});

var song_List = module.exports = mongoose.model('songList', songList_Schema);
module.exports.get = function (callback, limit) {
	song_List.find(callback).limit(limit);
}