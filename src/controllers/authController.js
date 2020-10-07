const { User } = require('../models/userModel');

exports.register = async (req, res) => {
  const user = new User(req.body);

  await user.save((err, _doc) => {
    if (err) {
      return res.status(422).json({ message: "Failed to update DB" });
    }
    return res.status(200).end();
  });
};

exports.login = (req, res) => {
  User.findOne({ email: req.body.email }, (_err, user) => {
    if (!user) {
      return res.status(404).json({ message: 'User email not found!' });
    }
    user.comparePassword(req.body.password, (_err, isMatch) => {
      if (!isMatch) {
        return res.status(400).json({ message: 'Wrong Password!' });
      }
      user.generateToken((err, user) => {
        if (err) {
          return res.status(400).send({ message: 'Failed to generate token' });
        }
        const data = {
          id: user._id,
          name: user.name,
          position: user.position,
          email: user.email,
          token: user.token
        }
        res.cookie('authToken', user.token).status(200).json(data);
      });
    });
  });
};

exports.logout = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.user._id },
    { token: '' },
    err => {
      if (err) {
        return res.status(422).json({ message: 'Failed to update DB' });
      }
      return res.status(200).end();
    }
  );
};

exports.getDetails = (req, res) => {
  return res.status(200).json({
    id: req.user._id,
    name: req.user.name,
    position: req.user.position,
    email: req.user.email,
  });
};
