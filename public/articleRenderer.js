let articleRenderer = (function () {
    let ARTICLE_TEMPLATE;
    let ARTICLE_LIST_NODE;

    function init() {
        ARTICLE_TEMPLATE = document.querySelector('#template-article-list-item');
        ARTICLE_LIST_NODE = document.querySelector('.article-list');
    }

    function renderArticles(articles) {
        let articlesNodes = createArticlesDomEntity(articles);

        articlesNodes.forEach((node) => {
            ARTICLE_LIST_NODE.appendChild(node);
        });
    }

    function createArticlesDomEntity(articles) {
        return articles.map(function (article) {
            return createArticleDomEntity(article);
        });
    }

    function createArticleDomEntity(article) {
        let template = ARTICLE_TEMPLATE;

        template.content.querySelector('.article-list-item-tags').textContent = '';

        template.content.querySelector('.article-list-item').dataset.id = article.id;
        template.content.querySelector('.article-list-item-title').textContent = article.title;
        template.content.querySelector('.article-list-item-summary').textContent = article.summary;
        template.content.querySelector('.article-list-item-content').textContent = article.content;
        template.content.querySelector('#article-list-item-image').src = article.image;
        template.content.querySelector('.article-list-item-author').textContent = article.author;
        template.content.querySelector('.article-list-item-date').textContent = formatDate(article.createdAt);
        formatTags(template.content.querySelector('.article-list-item-tags'), article.tags);

        template.content.querySelector('.fa-chevron-down').style.display = 'inline-block';
        return template.content.querySelector('.article-list-item').cloneNode(true);
    }

    function renderArticle(article) {
        let node = createArticleDomEntity(article);
        ARTICLE_LIST_NODE.insertBefore(node, ARTICLE_LIST_NODE.childNodes[0]);
    }

    function formatDate(string) {
        let date;

        if (!string) {
            date = new Date();
        } else {
            date = new Date(string);
        }

        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    }

    function formatTags(template, tags) {

        tags.forEach((tag) => {
            template.appendChild(createTagDomEntity(tag));
        });

        function createTagDomEntity(innerHtml) {
            let a = document.createElement('a');
            a.className = 'article-list-item-tag';
            a.innerHTML = innerHtml;
            return a;
        }
    }

    return {
        init: init,
        renderArticles: renderArticles,
        renderArticle: renderArticle
    };
}());
