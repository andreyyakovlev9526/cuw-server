let mongoose = require('mongoose');

const songSchema = mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	titleEn: {
		type: String,
	},
	// sheets: [
	// 	{
	// 		title: String,
	// 		url: String,
	// 	}
	// ],
	// samples: [
	// 	{
	// 		title: String,
	// 		url: String,
	// 	}
	// ]
});

module.exports = mongoose.model('song', songSchema);