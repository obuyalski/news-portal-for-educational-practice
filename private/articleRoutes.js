const articleService = require('./articleService');

module.exports.getArticles = (req, res) => {
    let skip = Number(req.query.skip);
    let top = Number(req.query.top);
    let filterConfig = {
        author: req.query.author || '',
        tags: (req.query.tags) ? req.query.tags.split(',') : [],
        createdAt: req.query.createdAt || ''
    };

    let articles = articleService.getArticles(skip, top, filterConfig);

    res.json(articles);
};

module.exports.getArticlesById = (req, res) => {
    let id = req.query.id;
    let article = articleService.getArticleById(id);

    if (article) {
        res.json(article);
    } else {
        res.status(404);
        res.send('Article with id = ' + id + ' not found');
    }
};

module.exports.addArticle = (req, res) => {
    let addedArticle = articleService.addArticle(req.body.article);

    res.json(addedArticle);
};

module.exports.removeArticle = (req, res) => {
    let id = req.query.id;
    let article = articleService.removeArticle(id);

    if (article) {
        res.json(article);
    } else {
        res.status(404);
        res.send('Article with id = ' + id + ' not found');
    }
};

module.exports.editArticle = (req, res) => {
    let id = req.query.id;
    let article = req.body.article;
    let oldArticle = articleService.getArticleById(id);

    if (oldArticle) {
        articleService.replaceArticle(oldArticle, article);
        res.json(oldArticle);
    } else {
        res.status(404);
        res.send('Article with id = ' + id + ' not found');
    }
};
