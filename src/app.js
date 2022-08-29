const express = require('express');
const mongoose = require('mongoose');
require('./db/mongoose');
const User = require('./models/user');
const Contest = require('./models/contest');
const userRouter = require('./routers/user');
const contestRouter = require('./routers/contest');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(contestRouter);

module.exports = app;
