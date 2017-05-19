document.addEventListener('DOMContentLoaded', startApp);

function startApp() {
  articleRenderer.init();

  modalBox.init();

  articleActions.init();

  pagination.init();

  searchEngine.init();

  userModel.init();
}
