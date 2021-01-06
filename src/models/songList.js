const { ObjectId } = require('mongodb');
let mongoose = require('mongoose');
songModel = require('./song');
memberModel = require('./member');

const songListSchema = mongoose.Schema({
	// songs: [
	// 	{
	// 		type: ObjectId,
	// 		ref: 'song',
	// 	}
	// ],
	date: {
		type: String,
		required: true,
	},
	note: {
		type: String,
	},
	// members: [
	// 	{
	// 		type: ObjectId,
	// 		ref: 'member',
	// 	}
	// ],
});

module.exports = mongoose.model('songList', songListSchema);