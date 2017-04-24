const articleService = require('./articleService');

module.exports.getArticles = (req, res) => {
    let skip = Number(req.query.skip);
    let top = Number(req.query.top);
    let filterConfig = {
        author: req.query.author || '',
        tags: (req.query.tags) ? req.query.tags.split(',') : [],
        createdAt: req.query.createdAt || ''
    };

    let articles = articleService.getArticles(skip, top, filterConfig).then(articles => {
        res.json(articles)
    })
        .catch(error => {
            res.status(error);
            res.send('Cannot get any articles');
        });
};

module.exports.getArticlesById = (req, res) => {
    let id = req.query.id;
    articleService.getArticleById(id).then(article => {
        res.json(article);
    }).catch(error => {
        res.status(error);
        res.send('Article with id = ' + id + ' not found');
    });
};

module.exports.addArticle = (req, res) => {
    articleService.addArticle(req.body.article)
        .then(addedArticle => res.json(addedArticle))
        .catch(error => {
                res.status(error);
                res.send('Article not added');
            }
        );
};

module.exports.removeArticle = (req, res) => {
    let id = req.query.id;
    articleService.removeArticle(id).then(article =>
        res.json(article)
    ).catch(error => {
        res.status(404);
        res.send('Article with id = ' + id + ' not found');
    });
};

module.exports.editArticle = (req, res) => {
    let id = req.query.id;
    let newArticle = req.body.article;
    articleService.getArticleById(id)
        .then(oldArticle => {
            return oldArticle;
        })
        .then(oldArticle => {
            articleService.editArticle(oldArticle, newArticle)
                .then(article => res.json(article))
        })
        .catch(error => {
            res.status(error);
            res.send('Article with id = ' + id + ' not found');
        });
};