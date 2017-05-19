const searchEngine = (function () {
  let SEARCH_BTN;

  function init() {
    SEARCH_BTN = document.querySelector('.filter-article-list');
    SEARCH_BTN.addEventListener('click', handleSearchByFilter);
  }

  function handleSearchByFilter() {
    const filterConfig = collectArticleFilterInfo();
    pagination.changeParams({ filterConfig });
    articleRenderer.clear();
    pagination.showArticles();
  }

  function collectArticleFilterInfo() {
    let result = {};

    const author = document.querySelector('.search-articles-by-author').value.trim().replace(/\s+/, ' ');
    const tags = document.querySelector('.search-articles-by-tags').value.trim().replace(/\s+/, ' ');
    const date = document.querySelector('.search-articles-by-date').value.trim().replace(/\s+/, ' ');

    result = {
      author: author || '',
      tags: (!tags) ? [] : tags.trim().split(/\s+/),
      createdAt: date || ''
    };
    return result;
  }

  return {
    init
  };
}());
