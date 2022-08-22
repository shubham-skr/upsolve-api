const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/user');
const Contest = require('../../src/models/contest');

const userOneId = new mongoose.Types.ObjectId();

const userOne = {
  _id: userOneId,
  name: 'Miles Morales',
  email: 'mile@example.com',
  password: 'milesmorales123',
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};

const userTwoId = new mongoose.Types.ObjectId();

const userTwo = {
  _id: userTwoId,
  name: 'Adam Warlock',
  email: 'adamwarlock@example.com',
  password: 'adamwarlock123',
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET),
    },
  ],
};

const contestOne = {
  _id: new mongoose.Types.ObjectId(),
  name: 'Codeforces Round 123',
  url: 'http://localhost:3000/',
  solve: ['800', '1300'],
  upsolve: ['1700'],
  note: 'Build solution from smaller observation',
  owner: userOne._id,
};

const contestTwo = {
  _id: new mongoose.Types.ObjectId(),
  name: 'Codechef contest 123',
  url: 'http://localhost:3000/',
  solve: ['1400', '1800', '2200'],
  upsolve: ['2500', '2700'],
  note: 'Try to think faster',
  owner: userOne._id,
};

const contestThree = {
  _id: new mongoose.Types.ObjectId(),
  name: 'AtCoder Beginner Contest 123',
  url: 'http://localhost:3000/',
  solve: ['100', '200', '300', '400'],
  upsolve: [],
  owner: userTwo._id,
};

const setupDatabase = async () => {
  await User.deleteMany();
  await Contest.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Contest(contestOne).save();
  await new Contest(contestTwo).save();
  await new Contest(contestThree).save();
};

module.exports = {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  contestOne,
  contestTwo,
  contestThree,
  setupDatabase,
};
