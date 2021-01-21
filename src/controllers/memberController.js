const check = require('express-validator/check');
const Member = require('../models/member');

exports.index = async (req, res) => {
	res.json(await Member.find());
};

exports.createOrUpdate = async (req, res) => {
	await check.check('name').notEmpty().run(req);
	await check.check('phone').notEmpty().run(req);
	await check.check('position').notEmpty().run(req);

	const result = check.validationResult(req);
	if (!result.isEmpty()) {
		return res.status(400).json({ errors: result.array() });
	}

	const member = req.params.id ? await Member.findById(req.params.id) : new Member();
	member.name = req.body.name;
	member.phone = req.body.phone;
	member.skype = req.body.skype;
	member.position = req.body.position;
	member.note = req.body.note;
	member.email = req.body.email;

	res.json(await member.save());
};

exports.view = async (req, res) => {
	res.json(await Member.findById(req.params.id));
};

exports.delete = async (req, res) => {
	await Member.deleteOne({_id: req.params.id});
	res.json();
};
