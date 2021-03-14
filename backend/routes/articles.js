const express = require('express');

const router = express.Router();

const { getArticles, createArticle, deleteArticle } = require('../controllers/users');

router.get('/articles', getArticles);

router.post('/articles', createArticle);

router.delete('/articles/articleId', deleteArticle);
