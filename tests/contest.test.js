const request = require('supertest');
const app = require('../src/app');
const Contest = require('../src/models/contest');
const {
  userOneId,
  userOne,
  setupDatabase,
  userTwoId,
  userTwo,
  contestOne,
  contestTwo,
  contestThree,
} = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should create contest for user', async () => {
  const response = await request(app)
    .post('/contest')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      title: 'New Contest',
      url: 'http://localhost:3000/',
      solve: ['100'],
      upsolve: ['200'],
      note: 'New Note',
    })
    .expect(201);

  const contest = await Contest.findById(response.body._id);
  expect(contest).not.toBeNull();
  expect(contest.done).toBe(false);
});

test('Should fetch user contests', async () => {
  const response = request(app)
    .get('/contest')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  expect((await response).body.length).toBe(2);
});

test('Should update user contest', async () => {
  await request(app)
    .patch(`/contest/${contestOne._id}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      done: 'true',
    })
    .expect(200);

  const contest = await Contest.findById(contestOne._id);
  expect(contest.done).toBe(true);
});

test('Should delete authenticated user contest', async () => {
  await request(app)
    .delete(`/contest/${contestOne._id}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const contest = await Contest.findById(contestOne._id);
  expect(contest).toBeNull();
});

test('Should not delete other users contest', async () => {
  await request(app)
    .delete(`/contest/${contestTwo._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);

  const contest = await Contest.findById(contestTwo._id);
  expect(contest).not.toBeNull();
});
