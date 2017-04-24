let searchEngine = (function () {

    let SEARCH_BTN;

    function init() {
        SEARCH_BTN = document.querySelector('.filter-article-list');
        SEARCH_BTN.addEventListener('click', handleSearchByFilter);
    }

    function handleSearchByFilter() {
        let filterConfig = collectArticleFilterInfo();
        pagination.changeParams({filterConfig: filterConfig});
        articleRenderer.clear();
        pagination.showArticles();
    }

    function collectArticleFilterInfo() {
        let result = {};

        let author = document.querySelector('.search-articles-by-author').value.trim().replace(/\s+/, ' ');
        let tags = document.querySelector('.search-articles-by-tags').value.trim().replace(/\s+/, ' ');
        let date = document.querySelector('.search-articles-by-date').value.trim().replace(/\s+/, ' ');

        result = {
            author: author || '',
            tags: (!tags) ? [] : tags.trim().split(/\s+/),
            createdAt: date || ''
        };

        return result;
    }

    return {
        init: init
    }
})();