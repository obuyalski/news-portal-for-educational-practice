const db = require('diskdb');

const ArticleModel = {
  init() {
    db.connect('database/', ['articles']);
  },

  getArticleById(id) {
    return new Promise((resolve, reject) => {
      const article = db.articles.findOne({ _id: id });
      if (article) {
        resolve(article);
        return;
      }
      reject({ status: 404, statusText: `Article with id = ${id} not found` });
    });
  },

  getArticles(skip, top, filterConfig) {
    return new Promise((resolve, reject) => {
      const articles = db.articles.find()
        .filter(article => Object.keys(filterConfig).every((key) => {
          if (!filterConfig[key]) {
            return true;
          }
          if (Array.isArray(filterConfig[key])) {
            const every = filterConfig[key].every(tag => article[key].indexOf(tag) !== -1);
            return every;
          }
          if (key === 'createdAt') {
            return new Date(filterConfig[key]).toDateString() === new Date(article[key]).toDateString();
          }
          return filterConfig[key] === article[key];
        }))
        .sort((article1, article2) => (new Date(article2.createdAt)).getTime() - (new Date(article1.createdAt).getTime()))
        .slice(skip, skip + top);

      if (articles) {
        resolve(articles);
        return;
      }
      reject({ status: 404, statusText: 'Cannot get any articles' });
    });
  },

  editArticle(oldArticle, newArticle) {
    return new Promise((resolve, reject) => {
      const result = db.articles.update({ _id: oldArticle._id }, newArticle);
      if (result.updated === 1) {
        resolve(newArticle);
        return;
      }
      reject({ status: 404, statusText: 'Article not edit' });
    });
  },

  addArticle(article) {
    return new Promise((resolve, reject) => {
      const newArticle = db.articles.save(article);
      if (newArticle) {
        resolve(newArticle);
        return;
      }
      reject({ status: 404, statusText: 'Article not added' });
    });
  },


  removeArticle(id) {
    return new Promise((resolve, reject) => {
      const removeArticle = db.articles.remove({ _id: id });
      if (removeArticle) {
        resolve(removeArticle);
        return;
      }
      reject({ status: 404, statusText: 'Article not remove' });
    });
  }
};

module.exports = ArticleModel;
