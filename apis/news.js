const { default: axios } = require('axios');

/**
 * 
 * @param {String}  Topic for news search 
 * @returns         Javascript objects array of top 10 articles
 */
const getNewsObjects = (query) => {
    return axios
    .get("https://newsapi.org/v2/everything?" +"q=" + query + 
    "&pageSize=10" + "&language=en" + "&sortBy=relevancy" + 
    "&apiKey=" + process.env.NEWSAPIKEY)
    .then((response) => {
        return truncateArticles(response.data.articles);
    })
    .catch((error) => {
        error.message = "No news could be retrieved - try again";
        throw error;
    });
};

/**
 * 
 * @param {Object[]} Array of news articles
 * @returns          The passed in articles with the selected relevant fields
 */
const truncateArticles = (articles) => {
    truncatedArticles = [];
    for (const article of articles) {
        truncatedArticles.push({
            source: article.source.name,
            author: article.author,
            title:  article.title,
            url:    article.url,
            image:  article.urlToImage
        })
    }

    return truncatedArticles;
}

module.exports = {getNewsObjects};
  