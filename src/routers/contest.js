const express = require('express');
const Contest = require('../models/contest');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/contest', auth, async (req, res) => {
  const contest = new Contest({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await contest.save();
    res.status(201).send(contest);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/contest', auth, async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.done) {
    match.done = req.query.done=== 'true';
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':');
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  }

  try {
    await req.user
      .populate({
        path: 'contests',
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    res.send(req.user.contests);
  } catch (error) {
    res.status(500).send();
  }
});

router.get('/contest/:id', auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const contest = await Contest.findOne({ _id, owner: req.user._id });

    if (!contest) {
      return res.status(404).send();
    }

    res.send(contest);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch('/contest/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdate = ['title', 'url', 'done', 'solve', 'upsolve', 'note'];
  const isValidOperation = updates.every((update) =>
    allowedUpdate.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid Operation' });
  }

  try {
    const contest = await Contest.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!contest) {
      return res.status(404).send();
    }

    updates.forEach((update) => (contest[update] = req.body[update]));
    console.log(req.body);
    await contest.save();

    res.send(contest);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/contest/:id', auth, async (req, res) => {
  try {
    const contest = await Contest.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!contest) {
      return res.status(404).send();
    }

    res.send(contest);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
