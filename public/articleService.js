let articleService = (function () {

    function loadArticles(skip, top, filterConfig) {
        articleModel.getArticles({skip: skip, top: top, filterConfig: filterConfig}, (response, articles) => {
            if (response.status === 200) {
                articleRenderer.renderArticles(articles);
                pagination.update(articles.length);
            }
        });
    }

    return {
        loadArticles: loadArticles
    }

}());