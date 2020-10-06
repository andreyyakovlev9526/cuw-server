let mongoose = require('mongoose');

const memberSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	phone: {
		type: String,
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

const Member = module.exports = mongoose.model('member', memberSchema);
module.exports.get = function (callback, limit) {
	Member.find(callback).limit(limit);
}