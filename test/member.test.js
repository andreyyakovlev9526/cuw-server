const request = require('supertest');
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require('../app');
let memberId;

describe('Member', () => {

  let mongoServer;

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

  it('Get member index', async () => {
    const res = await request(app)
      .get('/api/member/')
  });

  it('Create a new member', async () => {
    const res = await request(app)
      .post('/api/member')
      .send({
        name: 'Vitya',
        phone: '+380937715678',
        skype: '23etrys34',
        position: 'bass',
        note: 'expierenced',
        email: 'test@test.com'
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body.name).toEqual('Vitya')
    expect(res.body.phone).toEqual('+380937715678')
    expect(res.body.skype).toEqual('23etrys34')
    expect(res.body.position).toEqual('bass')
    expect(res.body.note).toEqual('expierenced')
    expect(res.body.email).toEqual('test@test.com')

    memberId = res.body._id;
  });

  it('View a member', async () => {
    const res = await request(app)
      .get('/api/member/' + memberId)
    expect(res.statusCode).toEqual(200)
    expect(res.body.name).toEqual('Vitya')
    expect(res.body.phone).toEqual('+380937715678')
    expect(res.body.skype).toEqual('23etrys34')
    expect(res.body.position).toEqual('bass')
    expect(res.body.note).toEqual('expierenced')
    expect(res.body.email).toEqual('test@test.com')
  });

  it('Update a member', async () => {
    let res = await request(app)
      .put('/api/member/' + memberId)
      .send({
        name: 'Eugen',
        phone: '+380486343478',
        skype: 'eugene95',
        position: 'guitar',
        note: 'normal',
        email: 'eugentest@test.com'
      })
    expect(res.statusCode).toEqual(200)

    res = await request(app)
      .get('/api/member/' + memberId)
    expect(res.statusCode).toEqual(200)
    expect(res.body.name).toEqual('Eugen')
    expect(res.body.phone).toEqual('+380486343478')
    expect(res.body.skype).toEqual('eugene95')
    expect(res.body.position).toEqual('guitar')
    expect(res.body.note).toEqual('normal')
    expect(res.body.email).toEqual('eugentest@test.com')
  });

  it('Delete a member', async () => {
    await request(app).delete('/api/member/' + memberId)
  });
})