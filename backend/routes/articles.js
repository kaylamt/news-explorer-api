const express = require('express');
const { celebrate, Joi } = require('celebrate');
const urlValidator = require('../utils/custom-joi-validators');

const router = express.Router();

const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');

router.get('/', getArticles);

router.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().custom(urlValidator),
    image: Joi.string().required().custom(urlValidator),
  }),
}), createArticle);

router.delete('/:articleId', deleteArticle);

module.exports = router;
