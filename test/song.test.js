const request = require('supertest');
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require('../app');
let songId;

describe('Song', () => {
  let mongoServer;

  // TODO: move to separate file
  beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    const URI = await mongoServer.getUri();
    await mongoose.connection.close();
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async done => {
    mongoose.disconnect(done);
    await mongoServer.stop();
  });

  it('Get song index', async () => {
    const res = await request(app)
      .get('/api/song/')
  });

  it('Create a new song', async () => {
    const res = await request(app)
      .post('/api/song')
      .send({
        title: 'Песня',
        title_en: 'Song',
        sheets: [
          {
            title: 'Song-sheet',
            url: 'http://example.com/song.pdf',
          }
        ],
        samples: [
          {
            title: 'Song',
            url: 'http://example.com/song.mp3',
          }
        ],
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body.title).toEqual('Песня')
    expect(res.body.title_en).toEqual('Song')

    expect(res.body.sheets.length).toEqual(1);
    expect(res.body.sheets[0].title).toEqual('Song-sheet');
    expect(res.body.sheets[0].url).toEqual('http://example.com/song.pdf');

    expect(res.body.samples.length).toEqual(1);
    expect(res.body.samples[0].title).toEqual('Song');
    expect(res.body.samples[0].url).toEqual('http://example.com/song.mp3');

    songId = res.body._id;
  });

  it('View a song', async () => {
    const res = await request(app)
      .get('/api/song/' + songId)
    expect(res.statusCode).toEqual(200)
    expect(res.body.title).toEqual('Песня')
    expect(res.body.title_en).toEqual('Song')
    expect(res.body.sheets[0].title).toEqual('Song-sheet')
    expect(res.body.sheets[0].url).toEqual('http://example.com/song.pdf')

    expect(res.body.samples.length).toEqual(1);
    expect(res.body.samples[0].title).toEqual('Song');
    expect(res.body.samples[0].url).toEqual('http://example.com/song.mp3');
  });

  it('Update a song', async () => {
    let res = await request(app)
      .put('/api/song/' + songId)
      .send({
        title: 'Другая песня',
        title_en: 'Another song',
        sheets: [
          {
            title: 'Other-song-sheet',
            url: 'http://example.com/other-song.pdf',
          }
        ],
        samples: [
          {
            title: 'Other-song',
            url: 'http://example.com/other-song.mp3',
          }
        ],
      })
    expect(res.statusCode).toEqual(200)

    res = await request(app)
      .get('/api/song/' + songId)
    expect(res.statusCode).toEqual(200)
    expect(res.body.title).toEqual('Другая песня')
    expect(res.body.title_en).toEqual('Another song')
    expect(res.body.sheets[0].title).toEqual('Other-song-sheet')
    expect(res.body.sheets[0].url).toEqual('http://example.com/other-song.pdf')

    expect(res.body.samples.length).toEqual(1)
    expect(res.body.samples[0].title).toEqual('Other-song');
    expect(res.body.samples[0].url).toEqual('http://example.com/other-song.mp3')
  });

  it('Delete a song', async () => {
    await request(app).delete('/api/song/' + songId)
  });
})