const request = require('supertest');
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require('../app');
let songListId;

describe('songList', () => {
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

  it('Get songList index', async () => {
    const res = await request(app)
      .get('/api/song-list/')
  });

  // it('Create a new song', async () => {
  //   const res = await request(app)
  //     .post('/api/song')
  //     .send(
  //       {
  //         title: 'Песня',
  //         title_en: 'Song',
  //         sheets: [
  //           {
  //             title: 'Song-sheet',
  //             url: 'http://example.com/song.pdf',
  //           }
  //         ],
  //         samples: [
  //           {
  //             title: 'Song',
  //             url: 'http://example.com/song.mp3',
  //           }
  //         ],
  //       },
  //     )

  //   expect(res.statusCode).toEqual(200)
  //   songId = res.body._id;
  // });

  it('Create a new member', async () => {
    const res = await request(app)
      .post('/api/member')
      .send(
        {
          name: 'Eugen',
          phone: '+380486343478',
          skype: 'eugene95',
          position: 'guitar',
          note: 'normal',
          email: 'eugentest@test.com'
        },
      )

    expect(res.statusCode).toEqual(200)
    memberId = res.body._id;
  });

  it('Create a new songList', async () => {
    const res = await request(app)
      .post('/api/song-list')
      .send({
        // songs: [
        //   songId
        // ],
        date: '2020-10-01',
        note: 'someNote',
        members: [
          memberId
        ],
      })
    expect(res.statusCode).toEqual(200)
    // expect(res.body.songs.length).toEqual(1)
    expect(res.body.date).toEqual('2020-10-01')
    expect(res.body.note).toEqual('someNote')
    expect(res.body.members.length).toEqual(1)
    songListId = res.body._id;
  });

  it('View a songList', async () => {
    const res = await request(app)
      .get('/api/song-list/' + songListId)
    expect(res.statusCode).toEqual(200)
    // expect(res.body.songs.length).toEqual(1)
    expect(res.body.date).toEqual('2020-10-01')
    expect(res.body.note).toEqual('someNote')
    expect(res.body.members.length).toEqual(1)
  });

  // it('Create a new update_song ', async () => {
  //   const res = await request(app)
  //     .post('/api/song')
  //     .send(
  //       {
  //         title: 'Песня-новая',
  //         title_en: 'Song-new',
  //         sheets: [
  //           {
  //             title: 'Song-sheet-new',
  //             url: 'http://example.com/song-new.pdf',
  //           }
  //         ],
  //         samples: [
  //           {
  //             title: 'Song-new',
  //             url: 'http://example.com/song-new.mp3',
  //           }
  //         ],
  //       },
  //     )

  //   expect(res.statusCode).toEqual(200)
  //   songNewUpdateId = res.body._id;
  // });

  it('Create a new update_member', async () => {
    const res = await request(app)
      .post('/api/member')
      .send(
        {
          name: 'Oleksii',
          phone: '+380668702199',
          skype: 'oleksii11',
          position: 'piano',
          note: 'notes',
          email: 'oleksiitest@test.com'
        },
      )

    expect(res.statusCode).toEqual(200)
    memberNewUpdateId = res.body._id;
  });

  it('Update a songList', async () => {
    let res = await request(app)
      .put('/api/song-list/' + songListId)
      .send({
        // songs: [
        //   songNewUpdateId
        // ],
        date: '2020-10-01',
        note: 'someNote',
        members: [
          memberNewUpdateId
        ],
      })
    expect(res.statusCode).toEqual(200)

    res = await request(app)
      .get('/api/song-list/' + songListId)

  });

  it('Delete a songList', async () => {
    await request(app).delete('/api/song-list/' + songListId)
  });
})