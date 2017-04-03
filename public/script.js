document.addEventListener('DOMContentLoaded', startApp);

function startApp() {
    articleRenderer.init();

    articleModel.getArticles({skip: 0, top: 10}, (response, articles) => {
        if (response.status === 200) {
            articleRenderer.renderArticles(articles);
        }
    });

}