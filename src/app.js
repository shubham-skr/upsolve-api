const express = require('express');
const mongoose = require('mongoose');
require('./db/mongoose');
const User = require('./models/user');
const Contest = require('./models/contest');
const userRouter = require('./routers/user');
const contestRouter = require('./routers/contest');

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(contestRouter);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

module.exports = app;
