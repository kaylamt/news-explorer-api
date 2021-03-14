const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        const regex = /^http(s)?:\/\/(www\.)?\S+\.\w{2,}(\S+)?$/i;
        return regex.test(link);
      },
      message: 'Sorry. you must enter a valid URL',
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(image) {
        const regex = /^http(s)?:\/\/(www\.)?\S+\.\w{2,}(\S+)?$/i;
        return regex.test(image);
      },
      message: 'Sorry. you must enter a valid URL',
    },
  },
  owner: {
    type: mongoose.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model('article', articleSchema);
