const articleRenderer = (function () {
  let ARTICLE_TEMPLATE;
  let ARTICLE_LIST_NODE;

  function init() {
    ARTICLE_TEMPLATE = document.querySelector('#template-article-list-item');
    ARTICLE_LIST_NODE = document.querySelector('.article-list');
  }

  function clear() {
    ARTICLE_LIST_NODE.innerHTML = '';
  }

  function renderArticles(articles) {
    const articlesNodes = createArticlesDomEntity(articles);

    articlesNodes.forEach((node) => {
      ARTICLE_LIST_NODE.appendChild(node);
    });
    showBtnChevron();
  }

  function showBtnChevron() {
    if (document.querySelector('.dropbtn').innerHTML === '') {
      for (let i = 0; i < document.querySelectorAll('.fa-chevron-down').length; i += 1) {
        document.querySelectorAll('.fa-chevron-down').item(i).style.display = 'none';
      }
    } else {
      for (let i = 0; i < document.querySelectorAll('.fa-chevron-down').length; i += 1) {
        document.querySelectorAll('.fa-chevron-down').item(i).style.display = 'inline-block';
      }
    }
  }

  function createArticlesDomEntity(articles) {
    return articles.map(article => createArticleDomEntity(article)
    );
  }

  function createArticleDomEntity(article) {
    const template = ARTICLE_TEMPLATE;

    template.content.querySelector('.article-list-item').dataset.id = article._id;
    template.content.querySelector('.article-list-item-title').textContent = article.title;
    template.content.querySelector('.article-list-item-summary').textContent = article.summary;
    template.content.querySelector('.article-list-item-content').textContent = article.content;
    template.content.querySelector('#article-list-item-image').src = article.image;
    template.content.querySelector('.article-list-item-author').textContent = article.author;
    template.content.querySelector('.article-list-item-date').textContent = formatDate(article.createdAt);
    formatTags(template.content.querySelector('.article-list-item-tags'), article.tags);

    return template.content.querySelector('.article-list-item').cloneNode(true);
  }

  function renderArticle(article) {
    const node = createArticleDomEntity(article);
    ARTICLE_LIST_NODE.insertBefore(node, ARTICLE_LIST_NODE.childNodes[0]);
  }

  function formatDate(string) {
    let date;

    if (!string) {
      date = new Date();
    } else {
      date = new Date(string);
    }

    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  function formatTags(template, tags) {
    template.textContent = '';

    tags.forEach((tag) => {
      template.appendChild(createTagDomEntity(tag));
    });

    function createTagDomEntity(innerHtml) {
      const a = document.createElement('a');
      a.className = 'article-list-item-tag';
      a.innerHTML = innerHtml;
      return a;
    }
  }

  function removeArticle(articleDomEntity) {
    ARTICLE_LIST_NODE.removeChild(articleDomEntity);
    if (document.querySelector('.fa-pencil-square-o').style.display === 'none') {
      articleActions.handleDisplayArticleList(true);
    }
  }

  function updateArticle(article) {
    const node = createArticleDomEntity(article);
    ARTICLE_LIST_NODE.replaceChild(node, document.querySelector(`[data-id='${article._id}']`));
    if (document.querySelector('.fa-pencil-square-o').style.display === 'none') {
      articleActions.articleReadMode();
    }
    return true;
  }

  return {
    init,
    clear,
    renderArticles,
    renderArticle,
    removeArticle,
    updateArticle,
    showBtnChevron
  };
}());
