let mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SALT = 10;

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	position: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

let user = this;

userSchema.methods.comparePassword = (candidatePassword, callBack) => {
	bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
		if (err) return callBack(err);
		callBack(null, isMatch);
	});
}

userSchema.methods.generateToken = (callBack) => {
	const token = jwt.sign(user._id.toHexString(), process.env.SECRETE);
	user.token = token;
	user.save(function (err, user) {
		if (err) return callBack(err)
		callBack(null, user)
	});
};

userSchema.statics.findByToken = (token, callBack) => {
	jwt.verify(token, process.env.SECRETE, function (err, decode) {
		user.findOne({ "_id": decode, "token": token }, function (err, user) {
			if (err) return callBack(err);
			callBack(null, user);
		});
	});
}

const User = module.exports = mongoose.model('user', userSchema);
module.exports.get = function (callback, limit) {
	User.find(callback).limit(limit);
}