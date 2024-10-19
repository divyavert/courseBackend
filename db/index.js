const { default: mongoose } = require('mongoose');

mongoose
  .connect(
    'mongodb+srv://dpanchori94:4rmU1eXdpmM2Linv@cluster0.pgvrrji.mongodb.net/course',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Connection error', err));

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchase: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'course',
    },
  ],
});

const courseSchema = new mongoose.Schema({
  title: String,
  descriptions: String,
  imageLink: String,
  price: Number,
});

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const user = mongoose.model('user', userSchema);
const course = mongoose.model('course', courseSchema);
const admin = mongoose.model('admin', adminSchema);

module.exports = {
  user,
  course,
  admin,
};
