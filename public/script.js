if(document.cookie && document.cookie.split(';')[3].replace('logout-link=', '') === ' none') {
    let cookies = [];
    cookies = document.cookie.split(';');
    document.getElementsByClassName('dropbtn')[0].innerHTML = cookies[0].replace('userName=', '');
    document.querySelector('.fa-pencil-square-o').style.display = cookies[1].replace('fa-pencil-square-o=', '');
    document.querySelector('.fa-sign-in').style.display = cookies[2].replace('fa-sign-in=', '');
    document.querySelector('.logout-link').style.display = cookies[3].replace('logout-link=', '');
}


const ADD_ARTICLE_BTN_INNER_TEXT = 'Опубликовать';
const EDIT_ARTICLE_BTN_INNER_TEXT = 'Отредактировать';

document.addEventListener('DOMContentLoaded', startApp);

function startApp() {

    articleRenderer.init();

    modalBox.init();

    articleActions.init();

    pagination.init();

    searchEngine.init();

}