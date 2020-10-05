
Member = require('../models/memberModel');

exports.index = (req, res) => {
	Member.find({}, (err, members) => {
		if (err) {
			res.json({
				status: "error",
				message: err,
			});
		}
		res.json(members);
	});
};

exports.new = function (req, res) {
	const member = new Member();
	member.name = req.body.name ? req.body.name : member.name;
	member.phone = req.body.phone;
	member.skype = req.body.skype;
	member.position = req.body.position;
	member.note = req.body.note;
	member.email = req.body.email;

	member.save(function (err) {
		if (err)
			res.json(err);
		res.json(member);
	});
};

exports.view = function (req, res) {
	Member.findById(req.params.member_id, function (err, member) {
		if (err)
			res.send(err);
		res.json(member);
	});
};

exports.update = function (req, res) {
	Member.findById(req.params.member_id, function (err, member) {
		if (err)
			res.send(err);
		member.name = req.body.name ? req.body.name : member.name;
		member.phone = req.body.phone;
		member.skype = req.body.skype;
		member.position = req.body.position;
		member.note = req.body.note;
		member.email = req.body.email;

		member.save(function (err) {
			if (err)
				res.json(err);
			res.json(member);
		});
	});
};

exports.delete = function (req, res) {
	Member.deleteOne({
		_id: req.params.member_id
	}, function (err, member) {
		if (err)
			res.send(err);
		res.json({
			status: "success"
		});
	});
};