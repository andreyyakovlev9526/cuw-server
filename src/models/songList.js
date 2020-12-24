const { ObjectId } = require('mongodb');
let mongoose = require('mongoose');
songModel = require('./song');
memberModel = require('./member');

const songList_Schema = mongoose.Schema({
	songs: [
		{
			type: ObjectId,
			ref: 'song',
		}
	],
	date: {
		type: String,
		required: true,
	},
	note: {
		type: String,
	},
	members: [
		{
			type: ObjectId,
			ref: 'member',
		}
	],
});

const song_List = module.exports = mongoose.model('songList', songList_Schema);
module.exports.get = function (callback, limit) {
	song_List.find(callback).limit(limit);
}