const articleModel = require('./articleModel');

let ArticleService = {
    getArticles: function (skip, top, filterConfig) {
        return articleModel.GLOBAL_ARTICLES.filter((article) => {
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
        }).slice(skip, skip + top);
    },

    getArticleById: function (id) {
        return articleModel.GLOBAL_ARTICLES.filter((article) => article.id === id)[0];
    },

    replaceArticle: function (oldArticle, newArticle) {
        Object.keys(newArticle).forEach((key) => oldArticle[key] = newArticle[key]);
    },

    addArticle: function (article) {
        let filledArticle = fillArticle(article);
        articleModel.GLOBAL_ARTICLES.unshift(filledArticle);

        return filledArticle;

        function fillArticle(article) {
            article.id = articleModel.GLOBAL_ARTICLES.length + 1;
            article.createdAt = new Date();
            return article;
        }
    },

    removeArticle: function (id) {
        let article = this.getArticleById(id);

        return articleModel.GLOBAL_ARTICLES.splice(articleModel.GLOBAL_ARTICLES.indexOf(article), 1)[0];
    }

};

module.exports = ArticleService;