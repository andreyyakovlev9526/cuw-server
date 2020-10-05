var mongoose = require('mongoose');

var memberSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	phone: {
		type: Number,
		required: true
	},
	skype: {
		type: String
	},
	position: {
		type: String,
		required: true
	},
	note: {
		type: String
	},
	email: {
		type: String
	}
});

var Member = module.exports = mongoose.model('member', memberSchema);
module.exports.get = function (callback, limit) {
	Member.find(callback).limit(limit);
}