let articleActions = (function () {

    let ARTICLE_LIST_NODE = document.querySelector('.article-list');
    let ADD_ARTICLE_NODE = document.querySelector('.fa-pencil-square-o');
    let SIGN_IN = document.querySelector('.fa-sign-in');
    let LOGOUT_LINK = document.querySelector('.logout-link');
    let HOME = document.querySelector('.home');
    let SHOW_FILTER = document.querySelector('#btn-show-filter');

    function init() {
        ARTICLE_LIST_NODE.addEventListener('click', handleArticleClick);
        ADD_ARTICLE_NODE.addEventListener('click', handleAddArticleClick);
        SIGN_IN.addEventListener('click', handleLogoutClick);
        LOGOUT_LINK.addEventListener('click', handleLogoutContainerClick);
        HOME.addEventListener('click', handleDisplayArticleList);
        SHOW_FILTER.addEventListener('click', handleDisplayFilter);
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


        if(event.target.innerHTML === 'Назад') {
            handleDisplayArticleList();
            return;
        }

        if (event.target.classList.contains('read-more')) {
            handleReadMoreClick(event.target.parentElement.parentElement);
        }

    }

    function handleDisplayFilter() {
        if (document.querySelector('.filter').style.display === 'block'){
            document.querySelector('.filter').style.display = '';
        }
        else {
            document.querySelector('.filter').style.display = 'block';
        }
    }

    function  handleDisplayArticleList() {
        let articles = pagination.save();

        articleModel.getArticles(articles, (response, articles) => {
            if (response.status === 200) {
                if(document.querySelector('.logout-link').style.display === 'none')
                document.querySelector('.fa-pencil-square-o').style.display = 'block';
                document.querySelector('#btn-show-filter').style.display = '';
                document.querySelector('.filter').style.display = '';
                document.querySelector('.article-list-item').style.display = 'none';
                articleRenderer.clear();
                articleRenderer.renderArticles(articles);
                pagination.save(articles.length);
           }
        });
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
        modalBox.openLoginForm();
    }

    function handleReadMoreClick(articleDomInstance) {

        articleModel.getArticleById(articleDomInstance.dataset.id, (response, article) => {
            if (response.status === 200) {
                document.querySelector('.filter').style.display = 'none';
                document.querySelector('.fa-pencil-square-o').style.display = 'none';
                document.querySelector('#pagination-show-more').style.display = 'none';
                articleRenderer.clear();

                articleRenderer.renderArticle(article);
                document.querySelector('.read-more').innerHTML = 'Назад';
                document.querySelector('#article-list-item-image').style.margin = '0 0 0 0';
                document.querySelector('.article-list-item-content').style.display = 'block';
                document.querySelector('#btn-show-filter').style.display = 'none';
                document.querySelector('.article-list-item').style.width = '80%';
                document.querySelector('.article-list-item-content').style.height = '100%';
            }
        });
    }

    function handleLogoutClick() {
        document.querySelector('.fa-pencil-square-o').style.display = 'none';
        document.querySelector('.dropbtn').style.display = 'none';
        document.querySelector('.fa-sign-in').style.display = 'none';
        document.querySelector('.fa-chevron-down').style.display = 'none';
        document.querySelector('.logout-link').style.display = 'block';

        document.cookie = "logout-link=block";
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

    return {
        init: init,
        addArticle: addArticle,
        editArticle: editArticle
    }
}());