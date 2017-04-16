let pagination = (function () {
    let SHOW_MORE_BUTTON;
    let SKIP;
    let TOP;
    let FILTER_CONFIG;

    function init() {
        SHOW_MORE_BUTTON = document.querySelector('#pagination-show-more');
        SHOW_MORE_BUTTON.addEventListener('click', handleShowMoreClick);

        SKIP = 0;
        TOP = 10;
        FILTER_CONFIG = {};

        showArticles();
    }

    function handleShowMoreClick() {
        showArticles();
    }

    function showArticles() {
        articleService.loadArticles(SKIP, TOP, FILTER_CONFIG);
    }

    function changeParams(params) {
        SKIP = params.skip || 0;
        TOP = params.top || 10;
        FILTER_CONFIG = params.filterConfig || {};
    }

    function update(articlesNumber) {
        SKIP += TOP;

        if (articlesNumber < TOP) {
            hideShowMoreButton();
        } else {
            showShowMoreButton();
        }
    }

    function save(articlesNumber) {
        if (articlesNumber % SKIP !== 0 || articlesNumber < TOP) {
            hideShowMoreButton();
            return {skip: 0, top: SKIP, filterConfig: {}};
        } else {
            showShowMoreButton();
            return {skip: 0, top: SKIP, filterConfig: {}};
        }
    }

    function hideShowMoreButton() {
        SHOW_MORE_BUTTON.style.display = 'none';
    }

    function showShowMoreButton() {
        SHOW_MORE_BUTTON.style.display = 'block';
    }

    return {
        init: init,
        update: update,
        save: save,
        showArticles: showArticles,
        changeParams: changeParams
    }

}());