let USERNAME = 'Буяльский Олег';
document.getElementsByClassName('dropbtn')[0].innerHTML = USERNAME;

const ADD_ARTICLE_BTN_INNER_TEXT = 'Опубликовать';
const EDIT_ARTICLE_BTN_INNER_TEXT = 'Отредактировать';

document.addEventListener('DOMContentLoaded', startApp);

function startApp() {

    articleRenderer.init();

    articleModel.getArticles({skip: 0, top: 10}, (response, articles) => {
        if (response.status === 200) {
            articleRenderer.renderArticles(articles);
        }
    });

    modalBox.init();

    articleActions.init();

}