const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');

module.exports.getArticles = (_req, res, next) => {
  Article.find({})
    .then((article) => res.send(article))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;
  const owner = req.user._id;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner,
  })
    .then((article) => res.send(article))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findOneAndRemove({ _id: req.params.id, owner: req.user._id })
    .then((article) => {
      if (article) {
        return res.send(article);
      } throw new NotFoundError('User not found');
    })
    .catch(next);
};
