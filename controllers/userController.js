const User = require('../models/userModel');

exports.index = (_req, res) => {
	User.find({}, (err, users) => {
		if (err) {
			return res.status(422).send('Failed to query DB');
		}
		res.json(users);
	});
};

exports.new = (req, res) => {
	const user = new User();
	user.name = req.body.name ? req.body.name : user.name;
	user.position = req.body.position;
	user.email = req.body.email; ˇ

	user.save(err => {
		if (err) {
			return res.status(422).send('Failed to update DB');
		}
		res.json(user);
	});
};

exports.view = (req, res) => {
	User.findById(req.params.user_id, (err, user) => {
		if (err) {
			return res.status(422).send('Failed to query DB');
		}
		res.json(user);
	});
};

exports.update = (req, res) => {
	User.findById(req.params.user_id, (err, user) => {
		if (err) {
			return res.status(422).send('Failed to update DB');
		}
		user.name = req.body.name ? req.body.name : user.name;
		user.position = req.body.position;
		user.email = req.body.email;
		user.save(err => {
			if (err) {
				return res.status(422).send('Failed to update DB');
			}
			res.json(user);
		});
	});
};

exports.delete = (req, res) => {
	User.deleteOne({ _id: req.params.user_id }, err => {
		if (err) {
			return res.status(422).send('Failed to update DB');
		}
		res.end();
	});
};
