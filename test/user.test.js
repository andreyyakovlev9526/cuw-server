const request = require('supertest');
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require('../app');
let userId;

describe('User', () => {
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

  it('Get user index', async () => {
    const res = await request(app)
      .get('/api/user/')
  });

  it('Create a new user', async () => {
    const res = await request(app)
      .post('/api/user')
      .send({
        name: 'Sasha',
        position: 'bass',
        email: 'test@test.com',
        password: '223ddsd'
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body.name).toEqual('Sasha')
    expect(res.body.position).toEqual('bass')
    expect(res.body.email).toEqual('test@test.com')
    userId = res.body._id;
  });

  it('View a user', async () => {
    const res = await request(app)
      .get('/api/user/' + userId)
    expect(res.statusCode).toEqual(200)
    expect(res.body.name).toEqual('Sasha')
    expect(res.body.email).toEqual('test@test.com')
    expect(res.body.position).toEqual('bass')
  });
  
  it('Update a user', async () => {
    let res = await request(app)
      .put('/api/user/' + userId)
      .send({
        name: 'Vitaliy',
        position: 'guitar',
        email: 'viteliytest@test.com',
        password: '32245retyu'
      })
    expect(res.statusCode).toEqual(200)

    res = await request(app)
      .get('/api/user/' + userId)
    expect(res.statusCode).toEqual(200)
    expect(res.body.name).toEqual('Vitaliy')
    expect(res.body.email).toEqual('viteliytest@test.com')
    expect(res.body.position).toEqual('guitar')
  });

  it('Delete a user', async () => {
    await request(app).delete('/api/user/' + userId)
  });
})