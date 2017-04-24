let modalBox = (function () {

    let modal = document.querySelector('.new-post');
    let openBtn = document.querySelector('.fa-pencil-square-o');
    let closeBtn = document.querySelector('#btn-publish-article');
    let modalOverlay = document.querySelector('#modal-box-overlay');
    let openBtnLogout = document.querySelector('.logout-link');
    let closeBtnLogout = document.querySelector('#login');
    let loginForm = document.querySelector('.login');
    let currentEditedArticleId;

    function init() {
        closeBtn.addEventListener('click', close);
        closeBtn.innerHTML = ADD_ARTICLE_BTN_INNER_TEXT;

        closeBtnLogout.addEventListener('click', closeLoginForm);
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
    }

    function openLoginForm() {
        loginForm.style.display = 'block';
        modalOverlay.style.display = 'block';
        openBtnLogout.style.opacity = '0';
    }

    function openAndFillInputFields(obj) {
        fillInputFields(obj);
        open();

        currentEditedArticleId = obj._id;
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
    }

    function closeLoginForm() {
        let user = getUserForm();
        userModel.addUser(user)
            .then(user => {
                let USERNAME = user.username;
                localStorage.setItem('username', USERNAME);
                document.getElementsByClassName('dropbtn')[0].innerHTML = USERNAME;
                handleLoginClick();
            })
            .catch(error => console.log(error));

        loginForm.style.display = 'none';
        modalOverlay.style.display = 'none';
        openBtnLogout.style.opacity = '1';
    }

    function handleLoginClick() {
        document.querySelector('.fa-pencil-square-o').style.display = 'block';
        document.querySelector('.dropbtn').style.display = 'block';
        document.querySelector('.fa-sign-in').style.display = 'block';
        document.querySelector('.logout-link').style.display = 'none';
        articleRenderer.showBtnChevron();
    }


    function getUserForm() {
        let user = {};
        user.username = document.querySelector('.user-name').value.trim().replace(/\s+/, ' ');
        user.password = document.querySelector('.password').value;

        return user;
    }

    function prepareArticleFor(mode, article) {
        article.title = document.querySelector('.news-title').value;
        article.image = document.querySelector('#news-img').value;
        article.summary = document.querySelector('.news-summary').value;
        article.content = document.querySelector('.news-content').value;
        article.tags = document.querySelector('.news-tags').value.trim().split(/\s+/);

        if (mode === 'add') {
            article.author = document.getElementsByClassName('dropbtn')[0].innerHTML;
        }

        if (mode === 'edit') {
            article._id = currentEditedArticleId + '';
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
        openLoginForm: openLoginForm,
        openAndFillInputFields: openAndFillInputFields,
        close: close,
        closeLoginForm: closeLoginForm,
        setCloseBtnInnerText: setCloseBtnInnerText,
        getCloseBtnInnerText: getCloseBtnInnerText
    }
}());
