const { Router } = require('express');
const router = Router();
const userMiddleware = require('../middleware/user');
const { user } = require('../db');

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

router.get('/course', async (req, res) => {
  const response = await course.find({});
  res.json({ response });
});

router.get('/course/:courseId', async (req, res) => {
  const courseId = req.params.courseId;
  const username = req.headers.username;
  user.updateOne(
    { username },
    {
      purchase: {
        $push: courseId,
      },
    }
  );
});

module.exports = router;
