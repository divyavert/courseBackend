const { Router } = require('express');
const router = Router();
const userMiddleware = require('../middleware/user');
const { user, course } = require('../db');

router.post('/signUp', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  await user.create({
    username,
    password,
  });
  res.json({
    msg: 'admin created successfully',
  });
});

router.get('/course', userMiddleware, async (req, res) => {
  const response = await course.find({});
  res.json({ response });
});

router.get('/course/:courseId', userMiddleware, async (req, res) => {
  const courseId = req.params.courseId;
  const username = req.headers.username;
  const value = await user.updateOne(
    { username: username },
    {
      $push: {
        purchase: courseId,
      },
    }
  );
  res.json({ msg: 'added course' });
});

router.get('/purchased', userMiddleware, async (req, res) => {
  const username = req.headers.username;
  const fetchedUser = await user.findOne({ username });

  const coursesId = fetchedUser.purchase;

  const courseDetails = await course.find({
    _id: {
      $in: coursesId,
    },
  });

  res.json({ courseDetails });
});

module.exports = router;
