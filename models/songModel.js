var mongoose = require('mongoose');

var songSchema = mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	title_en: {
		type: String,
	},
	sheets: [
		{
			title: String,
			url: String,
		}
	],
	samples: [
		{
			title: String,
			url: String,
		}
	]
});

var Song = module.exports = mongoose.model('song', songSchema);
module.exports.get = function (callback, limit) {
	Song.find(callback).limit(limit);
}