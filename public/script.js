const ADD_ARTICLE_BTN_INNER_TEXT = 'Опубликовать';
const EDIT_ARTICLE_BTN_INNER_TEXT = 'Отредактировать';

document.addEventListener('DOMContentLoaded', startApp);

function startApp() {

    articleRenderer.init();

    modalBox.init();

    articleActions.init();

    pagination.init();

    searchEngine.init();

    userModel.init();

}