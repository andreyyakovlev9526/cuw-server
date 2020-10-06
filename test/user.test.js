const request = require('supertest');
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const Project = require('../src/models/userModel');
const app = require('../app');

describe('User', () => {
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

  afterEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
      await collection.deleteMany();
    }
  });
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/user')
      .send({
        name: "Sasha",
        position: "bass",
        email: "test@test.com",
        password:'223ddsd'
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('email')
  });
  // it('should view user', async () => {
  //   const res = await request(app)
  //     .view('/api/user')
  //     .send(app)
  //   expect(res.statusCode).toEqual(200)
  //   // expect(res.body).toHaveProperty('email')
  // });

  // it('should be able to create a project', async () => {
  //   const response = await request(app)
  //     .post('/projects')
  //     .send({
  //       name: "Sasha",
  //       position: "bass",
  //       email: "test@test.com"
  //     })

  //   expect(response.status).toBe(200);
  // });

  // it('should not create a project if it has already been defined', async () => {
  //   await request(app)
  //     .post('/projects')
  //     .send({
  //       name: "Sasha",
  //       position: "bass",
  //       email: "test@test.com"
  //     })

  //   const response = await request(app)
  //     .post('/projects')
  //     .send({
  //       name: "Sasha",
  //       position: "bass",
  //       email: "test@test.com"
  //     });

  //   expect(response.body).toMatchObject({ error: 'Duplicated project' });
  // });

  // it('should be able to list all projects', async () => {
  //   const response = await request(app)
  //     .get('/projects');

  //   expect(response.status).toBe(200);
  // });
})

// const request = require('supertest');
// const app = require('../app');
// const { MongoClient } = require('mongodb');

// describe('insert', () => {
//   let connection;
//   let db;

  // beforeAll(async () => {
  //   connection = await MongoClient.connect(global.__MONGO_URI__, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true
  //   });
  //   db = await connection.db(global.__MONGO_DB_NAME__);
  // });

  // afterAll(async () => {
  //   await connection.close();
  //   await db.close();
  // });

//   describe('User Endpoints', () => {
//     it('should create a new user', async () => {
//       const res = await request(app)
//         .post('/api/user')
//         .send({
//           name: "Sasha",
//           position: "bass",
//           email: "test@test"
//         })
//       expect(res.statusCode).toEqual(200)
//       expect(res.body).toHaveProperty('email')
//     });
//     it('should view user', async () => {
//       const res = await request(app)
//         .view('/api/user')
//         .send(app)
//       expect(res.statusCode).toEqual(200)
//       // expect(res.body).toHaveProperty('email')
//     });
//   });
// });
