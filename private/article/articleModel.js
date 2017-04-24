const db = require('diskdb');

let ArticleModel = {

    init: function () {
        db.connect('database/', ['articles']);
    },

    getArticleById: function (id) {
        return new Promise(function (resolve, reject) {
            let article = db.articles.findOne({_id: id});
            if (article) {
                resolve(article);
                return;
            }
            reject(404);
        });
    },

    getArticles: function (skip, top, filterConfig) {
        return new Promise(function (resolve, reject) {
            let articles = db.articles.find()
                .filter((article) => {
                    return Object.keys(filterConfig).every((key) => {
                        if (!filterConfig[key]) {
                            return true;
                        }
                        if (Array.isArray(filterConfig[key])) {
                            let every = filterConfig[key].every(tag => article[key].indexOf(tag) !== -1);
                            return every;
                        } else {
                            if (key === 'createdAt') {
                                return new Date(filterConfig[key]).toDateString() === new Date(article[key]).toDateString();
                            } else {
                                return filterConfig[key] === article[key];
                            }
                        }
                    })
                })
                .sort((article1, article2) => (new Date(article2.createdAt)).getTime() - (new Date(article1.createdAt).getTime()))
                .slice(skip, skip + top);

            if (articles) {
                resolve(articles);
                return;
            }
            reject(404);
        });
    },

    editArticle: function (oldArticle, newArticle) {
        return new Promise(function (resolve, reject) {
            let result = db.articles.update({_id: oldArticle._id}, newArticle);
            if (result.updated === 1) {
                resolve(newArticle);
                return;
            }
            reject(404);
        });
    },

    addArticle: function (article) {
        return new Promise(function (resolve, reject) {
            let newArticle = db.articles.save(article);
            if (newArticle) {
                resolve(newArticle);
                return;
            }
            reject(404);
        });
    },


    removeArticle: function (id) {
        return new Promise(function (resolve, reject) {
            let removeArticle = db.articles.remove({_id: id});
            if (removeArticle) {
                resolve(removeArticle);
                return;
            }
            reject(404);
        });
    },

};

module.exports = ArticleModel;