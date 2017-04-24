let articleService = (function () {

    function loadArticles(skip, top, filterConfig) {
        articleModel.getArticles({skip: skip, top: top, filterConfig: filterConfig})
            .then(articles => {
                articleRenderer.renderArticles(articles);
                pagination.update(articles.length);
            })
            .catch(error => console.log(error));
    }

    return {
        loadArticles: loadArticles
    }

}());