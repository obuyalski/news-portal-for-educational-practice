const articleModel = (function () {
  const oReq = new XMLHttpRequest();

  function getArticles(params) {
    return new Promise((resolve, reject) => {
      const skip = params.skip || 0;
      const top = params.top || 10;
      const filterConfig = params.filterConfig || {};
      oReq.open('GET', buildQuery(), true);

      oReq.onload = function () {
        if (this.status === 200) {
          const articles = JSON.parse(this.responseText);
          resolve(articles);
        } else {
          reject(createError(this.status, this.statusText));
        }
      };

      oReq.onerror = function () {
        reject(new Error('Network Error'));
      };

      oReq.send();
      function buildQuery() {
        return `/articles?skip=${skip}&top=${top}${Object.keys(filterConfig).reduce((result, key) => {
          const concatenateString = `&${key}=${filterConfig[key]}`;
          return result + concatenateString;
        }, '')}`;
      }
    });
  }

  function addArticle(article) {
    return new Promise((resolve, reject) => {
      oReq.open('POST', '/article', true);
      oReq.setRequestHeader('content-type', 'application/json');

      if (!validateArticle(article)) {
        reject({ status: 500, statusText: 'Article is not valid' });
        return;
      }

      oReq.onload = function () {
        if (this.status === 200) {
          const article = JSON.parse(this.responseText);
          resolve(article);
        }
      };
      oReq.onerror = function () {
        reject(new Error('Network Error'));
      };
      oReq.send(JSON.stringify({ article }));
    });
  }

  function validateArticle(article) {
    return !!article && isValidString(article.title, 100) &&
      isValidString(article.summary, 200) &&
      isValidString(article.content, 2000) &&
      (!!article.tags) &&
      (article.tags.every(tag => !!tag));
  }

  function isValidString(string, maxLength) {
    return !!string && string.length > 0 && string.length <= maxLength;
  }

  function removeArticleById(id) {
    return new Promise((resolve, reject) => {
      oReq.open('DELETE', buildQuery(), true);
      oReq.onload = function () {
        if (this.status === 200) {
          const article = JSON.parse(this.responseText);
          if (article) {
            resolve(article);
          } else {
            reject(createError(this.status, this.statusText));
          }
        }
      };
      oReq.onerror = function () {
        reject(new Error('Network Error'));
      };

      oReq.send();

      function buildQuery() {
        return `/article?id=${id}`;
      }
    });
  }

  function getArticleById(id) {
    return new Promise((resolve, reject) => {
      oReq.open('GET', buildQuery(), true);

      oReq.onload = function () {
        if (this.status === 200) {
          const article = JSON.parse(this.responseText);
          if (article) {
            resolve(article);
          } else {
            reject(createError(this.status, this.statusText));
          }
        }
      };

      oReq.onerror = function () {
        reject(new Error('Network Error'));
      };

      oReq.send();

      function buildQuery() {
        return `/article?id=${id}`;
      }
    });
  }


  function editArticle(article) {
    return new Promise((resolve, reject) => {
      oReq.open('PUT', buildQuery(), true);
      oReq.setRequestHeader('content-type', 'application/json');

      if (!validateArticle(article)) {
        reject({ status: 500, statusText: 'Article is not valid' });
        return;
      }

      oReq.onload = function () {
        if (this.status === 200) {
          const article = JSON.parse(this.responseText);
          resolve(article);
        }
      };

      oReq.onerror = function () {
        reject(new Error('Network Error'));
      };

      oReq.send(JSON.stringify({ article }));
      function buildQuery() {
        return `/article?id=${article._id}`;
      }
    });
  }

  function createError(status, statusText) {
    const error = new Error(statusText);
    error.code = status;
    return error;
  }

  return {
    getArticles,
    addArticle,
    removeArticleById,
    getArticleById,
    editArticle
  };
}());
