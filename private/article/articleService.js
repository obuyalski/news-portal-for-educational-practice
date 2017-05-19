const articleModel = require('./articleModel');

const ArticleService = {

  getArticles(skip, top, filterConfig) {
    return articleModel.getArticles(skip, top, filterConfig);
  },

  getArticleById(id) {
    return articleModel.getArticleById(id);
  },

  editArticle(oldArticle, newArticle) {
    const expandedNewArticle = addMissingField(oldArticle, newArticle);

    return articleModel.editArticle(oldArticle, expandedNewArticle);

    function addMissingField(oldArticle, newArticle) {
      Object.keys(oldArticle).forEach((key) => {
        if (!newArticle[key]) {
          newArticle[key] = oldArticle[key];
        }
      });

      return newArticle;
    }
  },

  addArticle(article) {
    const newArticle = addedFieldsTo(article);

    return articleModel.addArticle(newArticle);

    function addedFieldsTo(article) {
      article.createdAt = new Date();
      return article;
    }
  },

  removeArticle(id) {
    return articleModel.removeArticle(id);
  }

};

module.exports = ArticleService;
