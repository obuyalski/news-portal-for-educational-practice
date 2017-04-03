let articleActions = (function () {

    let ARTICLE_LIST_NODE = document.querySelector('.article-list');
    let ADD_ARTICLE_NODE = document.querySelector('.fa-pencil-square-o');
    let SIGN_IN = document.querySelector('.fa-sign-in');
    let LOGOUT_LINK = document.querySelector('.logout-link');
    let SEARCH_BTN = document.querySelector('.filter-article-list');

    function init() {
        ARTICLE_LIST_NODE.addEventListener('click', handleArticleClick);
        ADD_ARTICLE_NODE.addEventListener('click', handleAddArticleClick);
        SIGN_IN.addEventListener('click', handleLogoutClick);
        LOGOUT_LINK.addEventListener('click', handleLogoutContainerClick);
        SEARCH_BTN.addEventListener('click', handleSearchByFilter);
    }

    function handleArticleClick(event) {

        if (event.target.tagName !== 'BUTTON') {
            return;
        }

        if (event.target.classList.contains('edit-post')) {
            handleEditArticleAction(event.target.parentElement.parentElement.parentElement);
            return;
        }

        if (event.target.classList.contains('remove-post')) {
            handleRemoveArticleAction(event.target.parentElement.parentElement.parentElement);
            return;
        }

        if (event.target.classList.contains('read-more')) {
            handleReadMoreClick(event.target.parentElement.parentElement);
            return;
        }
    }

    function handleSearchByFilter() {
        let filterConfig = FillingFilterArticle();

        let filteredArticles = articleModel.getArticles(0, articleModel.getArticlesCount(), filterConfig);
        articleRenderer.removeArticlesFromDom();
        articleRenderer.init();

        let paginationParams = pagination.init(filteredArticles.length, renderArticles);
        renderArticles(paginationParams.skip, paginationParams.top, filterConfig);
    }

    function handleAddArticleClick() {
        modalBox.setCloseBtnInnerText(ADD_ARTICLE_BTN_INNER_TEXT);
        modalBox.open();
    }

    function handleEditArticleAction(article) {
        modalBox.setCloseBtnInnerText(EDIT_ARTICLE_BTN_INNER_TEXT);

        articleModel.getArticleById(article.dataset.id, (response, article) => {
            if (response.status === 200) {
                modalBox.openAndFillInputFields(article);
            }
        });
    }

    function handleLogoutContainerClick() {
        document.querySelector('.fa-chevron-down').style.display = 'none';
        document.querySelector('.logout-link').style.opacity = 0;
        document.querySelector('.logout_sign-in').style.display = 'block';
    }

    function handleReadMoreClick(article) {
        document.querySelector('.filter').style.display = 'none';
        document.querySelector('.article-list').style.display = 'none';
        document.querySelector('#pagination-show-more').style.display = 'none';
        document.querySelector('.display-news').style.display = 'block';

        let a = articleModel.getArticleById(article.dataset.id);

        FillingOutNewsForm(a);
    }

    function handleLogoutClick() {
        document.querySelector('.home').style.display = 'none';
        document.querySelector('.fa-pencil-square-o').style.display = 'none';
        document.querySelector('.search').style.display = 'none';
        document.querySelector('.dropbtn').style.display = 'none';
        document.querySelector('.fa-sign-in').style.display = 'none';
        document.querySelector('.fa-chevron-down').style.display = 'none';
        document.querySelector('.logout-link').style.display = 'block';
    }

    function handleRemoveArticleAction(articleNodeToDelete) {
        articleModel.removeArticleById(articleNodeToDelete.dataset.id, (response, article) => {
            if (response.status === 200) {
                articleRenderer.removeArticle(articleNodeToDelete);
            }
        });
    }

    function addArticle(article) {
        articleModel.addArticle(article, (response, article) => {
            if (response.status === 200) {
                articleRenderer.renderArticle(article);
            }
        });
    }

    function editArticle(article) {

        articleModel.editArticle(article, (response, article) => {
            if (response.status === 200) {
                articleRenderer.updateArticle(article);
            }
        });

    }

    function FillingOutNewsForm(article) {


        document.querySelector('.article-title').textContent = article.title;
        document.querySelector('.article-content').textContent = article.content;
        document.querySelector('#article-image').src = article.image;
        document.querySelector('.article-author').textContent = article.author;

        let a = '';
        for (let i = 0; i < article.tags.length; i++) {
            a = document.createElement('a');
            a.className = 'article-tag';
            a.innerHTML = article.tags[i] + ' ';
            document.querySelector('.article-tags').appendChild(a);
        }
    }

    function FillingFilterArticle() {

        let author = document.querySelector('.search-articles-by-author').value.replace(/\s+/, ' ');
        let tags = document.querySelector('.search-articles-by-tags').value.replace(/\s+/, ' ');
        let date = document.querySelector('.search-articles-by-date').value.replace(/\s+/, ' ');

        let filterConfig = {};

        if (author !== '' && author !== ' ') {
            filterConfig.author = author;
        }
        if (tags !== '' && tags !== ' ') {
            filterConfig.tags = tags.split(/\s+/);
        }
        if (date !== '' && date !== ' ') {
            filterConfig.createdAt = date;
        }

        if (Object.keys(filterConfig).length === 0)
            return;

        return filterConfig;
    }

    return {
        init: init,
        addArticle: addArticle,
        editArticle: editArticle,
        FillingFilterArticle: FillingFilterArticle
    }
}());