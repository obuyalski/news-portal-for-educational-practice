let USERNAME = 'Буяльский Олег';
document.getElementsByClassName('dropbtn')[0].innerHTML = USERNAME;

const ADD_ARTICLE_BTN_INNER_TEXT = 'Опубликовать';
const EDIT_ARTICLE_BTN_INNER_TEXT = 'Отредактировать';

document.addEventListener('DOMContentLoaded', startApp);

function startApp() {

    articleRenderer.init();

    modalBox.init();

    articleActions.init();

    pagination.init();

}