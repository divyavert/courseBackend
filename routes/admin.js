const { Router } = require('express');

const router = Router();

const adminMiddleware = require('../middleware/admin');
const { admin, course } = require('../db');

router.post('/signUp', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  await admin.create({
    username,
    password,
  });
  res.json({
    msg: 'admin created successfully',
  });
});
// router.post('/course', adminMiddleware, (req, res) => {});
router.post('/course', adminMiddleware, async (req, res) => {
  const title = req.body.title;
  const descriptions = req.body.descriptions;
  const imageLink = req.body.imageLink;
  const price = req.body.price;

  await course.create({
    title,
    descriptions,
    imageLink,
    price,
  });

  res.json({
    msg: 'course added succesfully',
  });
});
router.get('/course', adminMiddleware, async (req, res) => {
  const response = await course.find({});
  res.json({ response });
});

module.exports = router;
