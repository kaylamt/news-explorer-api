const mongoose = require('mongoose');
const validate = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validate.isEmail(email);
      },
      message: 'Sorry, you must enter a valid email',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },

});

module.exports = mongoose.model('user', userSchema);
