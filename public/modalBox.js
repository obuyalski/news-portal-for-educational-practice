let modalBox = (function () {

    let modal = document.getElementsByClassName('new-post')[0];
    let openBtn = document.getElementsByClassName('fa-pencil-square-o')[0];
    let closeBtn = document.querySelector('#btn-publish-article');
    let modalOverlay = document.querySelector('#modal-box-overlay');

    let isOpened;

    let currentEditedArticleId;

    function init() {
        closeBtn.addEventListener('click', close);
        isOpened = false;
        closeBtn.innerHTML = ADD_ARTICLE_BTN_INNER_TEXT;
    }

    function setCloseBtnInnerText(text) {
        closeBtn.innerHTML = text;
    }

    function getCloseBtnInnerText() {
        return closeBtn.innerHTML;
    }

    function open() {
        modal.style.display = 'block';
        modalOverlay.style.display = 'block';
        openBtn.style.opacity = '0';

        isOpened = true;
    }

    function openAndFillInputFields(obj) {
        fillInputFields(obj);
        open();

        currentEditedArticleId = obj.id;
    }

    function close() {
        let article = {};

        if (getCloseBtnInnerText() === ADD_ARTICLE_BTN_INNER_TEXT) {
            article = prepareArticleFor('add', article);

            articleActions.addArticle(article);
        }

        if (getCloseBtnInnerText() === EDIT_ARTICLE_BTN_INNER_TEXT) {
            article = prepareArticleFor('edit', article);
            articleActions.editArticle(article);
        }

        modal.style.display = 'none';
        modalOverlay.style.display = 'none';
        openBtn.style.opacity = '1';

        clearInputFields();

        isOpened = false;
    }

    function prepareArticleFor(mode, article) {
        article.title = document.querySelector('.news-title').value;
        article.image = document.querySelector('#news-img').value;
        article.summary = document.querySelector('.news-summary').value;
        article.content = document.querySelector('.news-content').value;
        article.tags = document.querySelector('.news-tags').value.split(/\s+/);

        if (mode === 'add') {
            article.author = USERNAME;
        }

        if (mode === 'edit') {
            article.id = currentEditedArticleId + '';
        }

        return article;
    }

    function fillInputFields(obj) {
        document.querySelector('.news-title').value = obj.title;
        document.querySelector('#news-img').value = obj.image;
        document.querySelector('.news-summary').value = obj.summary;
        document.querySelector('.news-content').value = obj.content;
        document.querySelector('.news-tags').value = obj.tags.join(' ');
    }

    function clearInputFields() {
        document.querySelector('.news-title').value = '';
        document.querySelector('#news-img').value = '';
        document.querySelector('.news-summary').value = '';
        document.querySelector('.news-content').value = '';
        document.querySelector('.news-tags').value = '';
    }

    return {
        init: init,
        open: open,
        openAndFillInputFields: openAndFillInputFields,
        close: close,
        setCloseBtnInnerText: setCloseBtnInnerText,
        getCloseBtnInnerText: getCloseBtnInnerText
    }
}());