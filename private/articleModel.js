const db = require('diskdb');

let ArticleModel = {

    init: function() {
        db.connect('database/', ['articles']);
    },

    getArticleById: function (id) {
        return db.articles.findOne({_id: id});
    },

    getArticles: function (skip, top, filterConfig) {
        return db.articles.find()
            .filter((article) => {
                return Object.keys(filterConfig).every((key) => {
                    if (!filterConfig[key]) {
                        return true;
                    }
                    if (Array.isArray(filterConfig[key])) {
                        return filterConfig[key].every(tag => article[key].indexOf(tag) !== -1);
                    } else {
                        if (key === 'createdAt') {
                            return (new Date(filterConfig[key])).toDateString() === article[key].toDateString();
                        } else {
                            return filterConfig[key] === article[key];
                        }
                    }
                })
            })
            .slice(skip, skip + top)
            .sort((article1, article2) => article2.createdAt - article1.createdAt);
    },

    editArticle: function (oldArticle, newArticle) {
        let result = db.articles.update({_id: oldArticle._id}, newArticle);

        if (result.updated === 1) {
            return newArticle;
        }
    },

    addArticle: function (article) {
        return db.articles.save(article);
    },

    removeArticle: function (id) {
        return db.articles.remove({_id: id});
    }
};

module.exports = ArticleModel;