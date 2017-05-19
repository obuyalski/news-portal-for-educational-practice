const articleService = (() => {
  function loadArticles(skip, top, filterConfig) {
    articleModel.getArticles({ skip, top, filterConfig })
      .then((articles) => {
        articleRenderer.renderArticles(articles);
        pagination.update(articles.length);
      })
      .catch(error => console.log(error));
  }

  return {
    loadArticles
  };
})();
