const check = require('express-validator/check');
const User = require('../models/user');

exports.index = async (req, res) => {
	res.json(await User.find({}));
};

exports.createOrUpdate = async (req, res) => {
	await check.check('name').notEmpty().run(req);
	await check.check('email').notEmpty().run(req);
	await check.check('password').notEmpty().run(req);
	await check.check('position').notEmpty().run(req);

	const result = check.validationResult(req);
	if (!result.isEmpty()) {
		return res.status(400).json({ errors: result.array() });
	}

	const user = req.params.id ? await User.findById(req.params.id) : new User();
	user.name = req.body.name;
	user.position = req.body.position;
	user.password = req.body.password;
	user.email = req.body.email;

	res.json(await user.save());
};

exports.view = async (req, res) => {
	res.json(await User.findById(req.params.id));
};

exports.delete = async (req, res) => {
	await User.deleteOne({_id: req.params.id});
	res.json();
};
