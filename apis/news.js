const { default: axios } = require('axios');
const https = require('https');


const getNewsObjects = (query) => {
    return axios
    .get("https://newsapi.org/v2/everything?" +"q=" + query + 
    "&pageSize=5" + "&language=en" + "&sortBy=relevancy" + 
    "&apiKey=" + process.env.NEWSAPIKEY)
    .then((response) => {
        return truncateArticles(response.data.articles);
    })
    .catch((error) => {
        console.log(error.response.statusText);
    });
};

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

function createOptions(query) {
    const params = {
        pageSize: 5,
        language: 'en',
        sortBy: 'relevancy',
        api_key:  process.env.NEWSAPIKEY
    };
    
    const options = {
        hostname: 'newsapi.org',
        port:     443,
        path:     '/v2/everything?',
        method:   'GET'
    };
    
    const str = 'q=' + query +
                '&pageSize='+ params.pageSize +
                '&language='+ params.language +
                '&sortBy='  + params.sortBy +
                '&apiKey=' + params.api_key;
  
    options.path += str;
    return options;
  }

  module.exports = {getNewsObjects};
  