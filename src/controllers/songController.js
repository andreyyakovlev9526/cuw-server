const Song = require('../models/songModel');

exports.index = (_req, res) => {
  Song.find({}, (err, songs) => {
    if (err) {
      res.status(422).send('Failed to query DB');
    }
    res.json(songs);
  });
};

exports.new = (req, res) => {
  const song = new Song();
  song.title = req.body.title ? req.body.title : song.title;
  song.title_en = req.body.title_en;
  song.sheets = req.body.sheets;
  song.samples = req.body.samples;

  song.save(err => {
    if (err) {
      res.status(422).send('Failed to update DB');
    }
    res.json(song);
  });
};

exports.view = (req, res) => {
  Song.findById(req.params.song_id, (err, song) => {
    if (err) {
      res.status(422).send('Failed to query DB');
    }
    res.json(song);
  });
};

exports.update = (req, res) => {
  Song.findById(req.params.song_id, (err, song) => {
    if (err) {
      res.status(422).send('Failed to update DB');
    }
    song.title = req.body.title ? req.body.title : song.title;
    song.title_en = req.body.title_en;
    song.sheets = req.body.sheets;
    song.samples = req.body.samples;

    song.save(err => {
      if (err) {
        res.status(422).send('Failed to update DB');
      }
      res.json(song);
    });
  });
};

exports.delete = (req, res) => {
  Song.deleteOne({
    _id: req.params.song_id
  }, err => {
    if (err) {
      res.status(422).send('Failed to update DB');
    }
    res.end();
  });
};
