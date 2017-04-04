let pagination = (function () {
    let SHOW_MORE_BUTTON;
    let SKIP;
    let TOP;

    function init() {
        SHOW_MORE_BUTTON = document.querySelector('#pagination-show-more');
        SHOW_MORE_BUTTON.addEventListener('click', handleShowMoreClick);

        SKIP = 0;
        TOP = 10;
        loadArticles();
    }

    function handleShowMoreClick() {
        loadArticles();
    }

    function loadArticles() {
        articleModel.getArticles({skip: SKIP, top: TOP}, (response, articles) => {
            if (response.status === 200) {
                articleRenderer.renderArticles(articles);
                SKIP += TOP;
                hideShowMoreButton(articles.length);
            }
        });
    }

    function hideShowMoreButton(articlesNumber) {
        if (articlesNumber < TOP) {
            SHOW_MORE_BUTTON.style.display = 'none';
        }
    }

    return {
        init: init
    }

}());