const check = require('express-validator/check');
const Song = require('../models/song');

exports.index = async (req, res) => {
  res.json(await Song.find({}));
};

exports.createOrUpdate = async (req, res) => {
  await check.check('title').notEmpty().run(req);

  const result = check.validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  const song = req.params.id ? await Song.findById(req.params.id) : new Song();
  song.title = req.body.title;
  song.titleEn = req.body.titleEn;
  song.sheets = req.body.sheets;
  song.samples = req.body.samples;

  res.json(await song.save());
};

exports.view = async (req, res) => {
  res.json(await Song.findById(req.params.id));
};

exports.delete = async (req, res) => {
  await Song.deleteOne({_id: req.params.id});
  res.json();
};
