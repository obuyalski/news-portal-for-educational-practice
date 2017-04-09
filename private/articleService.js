const articleModel = require('./articleModel');

let ArticleService = {

    getArticles: function (skip, top, filterConfig) {
        return articleModel.getArticles(skip, top, filterConfig);
    },

    getArticleById: function (id) {
        return articleModel.getArticleById(id);
    },

    editArticle: function (oldArticle, newArticle) {
        newArticle = addMissingField(oldArticle, newArticle);

        return articleModel.editArticle(oldArticle, newArticle);

        function addMissingField(oldArticle, newArticle) {
            Object.keys(oldArticle).forEach((key) => {
               if (!newArticle[key]) {
                   newArticle[key] = oldArticle[key];
               }
            });

            return newArticle;
        }
    },

    addArticle: function (article) {
        let newArticle = addedFieldsTo(article);

        return articleModel.addArticle(newArticle);

        function addedFieldsTo(article) {
            article.createdAt = new Date();
            return article;
        }
    },

    removeArticle: function (id) {
        return articleModel.removeArticle(id);
    }

};

module.exports = ArticleService;