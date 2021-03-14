const express = require('express');

const router = express.Router();

const getUsers = require('../controllers/users');

router.get('/users/me', getUsers);
