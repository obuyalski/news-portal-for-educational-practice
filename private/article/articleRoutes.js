const articleService = require('./articleService');

module.exports.getArticles = (req, res) => {
  const skip = Number(req.query.skip);
  const top = Number(req.query.top);
  const filterConfig = {
    author: req.query.author || '',
    tags: (req.query.tags) ? req.query.tags.split(',') : [],
    createdAt: req.query.createdAt || ''
  };

  articleService.getArticles(skip, top, filterConfig)
    .then(articles => res.json(articles))
    .catch((error) => {
      res.status(error.status);
      res.send(error.statusText);
    });
};

module.exports.getArticlesById = (req, res) => {
  const id = req.query.id;
  articleService.getArticleById(id)
    .then(article => res.json(article))
    .catch((error) => {
      res.status(error.status);
      res.send(error.statusText);
    });
};

module.exports.addArticle = (req, res) => {
  articleService.addArticle(req.body.article)
    .then(addedArticle => res.json(addedArticle))
    .catch((error) => {
      res.status(error.status);
      res.send(error.statusText);
    });
};

module.exports.removeArticle = (req, res) => {
  const id = req.query.id;
  articleService.removeArticle(id)
    .then(article => res.json(article))
    .catch((error) => {
      res.status(error.status);
      res.send(error.statusText);
    });
};

module.exports.editArticle = (req, res) => {
  const id = req.query.id;
  const newArticle = req.body.article;
  articleService.getArticleById(id)
    .then(oldArticle => articleService.editArticle(oldArticle, newArticle))
    .then(article => res.json(article))
    .catch((error) => {
      res.status(error.status);
      res.send(error.statusText);
    });
};
