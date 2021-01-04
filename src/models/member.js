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
	position: {
		type: String,
		required: true
	},
	email: {
		type: String
	},
	skype: {
		type: String
	},
	note: {
		type: String
	}
});

module.exports = mongoose.model('member', memberSchema);
