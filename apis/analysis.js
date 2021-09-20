const { default: axios } = require('axios');
var qs = require("qs");

/**
 * Creates post requests to the extract article contents endpoint for each article 
 * and stores them as promises (to be handled)
 *  
 * @param {Object[]}  Array of news articles
 * @returns           Array of post request pending promises
 */
const createContentsPromises = (articles) => {
  let promises = [];
  for (const article of articles) {
    const options = {
      method: 'POST',
      url: 'https://text-analysis12.p.rapidapi.com/website-extraction/api/v1.3',
      headers: {
        'content-type':   'application/x-www-form-urlencoded',
        'x-rapidapi-host': 'text-analysis12.p.rapidapi.com',
        'x-rapidapi-key': process.env.RAPIDAPIKEY
      },
      data: qs.stringify({language: 'english', url: article.url})
    };
    promises.push(axios.request(options));
  }
  return promises;
}

/**
 * Handles each promise in the promises array to retrieve the contents from the articles' URLs
 * and store them in their respective news article object
 * 
 * @param {Object[]}  Array of news articles 
 * @returns           The passed in articles with a new contents field (retrieved from the post request)
 */
const getContents = (articles) => {
  const promises = createContentsPromises(articles);
  return Promise.all(promises)
  .then( (responses) => {
    let i = 0;
    for (const response of responses) {
      const textContent = response.data.website.contents;
      articles[i].content = createFullTextString(textContent);
      i++;
    }
  })
  .then(() => articles)
  .catch((error) => {
    error.message = "No news found on this topic";
    throw error;

  });
}

/**
 * Converts array of strings (paragraphs) to a full text string with double linefeeds 
 * to maintain the paragraphing
 * 
 * @param {String[]}  Array of strings (paragraphs from news the news articles) 
 * @returns           A single full text string of the article contents with some formatting
 */
const createFullTextString = (paragraphs) => {
  let i = 0;
  paragraphs.forEach((paragraph) => {
    paragraphs[i] = paragraph+' \n\n ';
    i++;
  });
  const fulltext = paragraphs.join('');
  return fulltext;
};

/**
 * Creates post requests to the summarise text endpoint for each article 
 * and stores them as promises (to be handled)
 * 
 * @param {Object[]}  Array of news articles
 * @returns           Array of post request pending promises
 */
const createSummaryPromises = (articles) => {
  let promises = [];

  for (const article of articles) {
    const options = {
      method: 'POST',
      url: 'https://text-analysis12.p.rapidapi.com/summarize-text/api/v1.1',
      headers: {
        'content-type': 'application/json',
        'x-rapidapi-host': 'text-analysis12.p.rapidapi.com',
        'x-rapidapi-key': process.env.RAPIDAPIKEY
      },
      data: {
        language: 'english',
        summary_percent: 25,
        text: article.content
      }
    };
    
    promises.push(axios.request(options));
  }
  return promises;
};

/**
 * Uses AI text summary endpoint to generate a summary of article news
 * 
 * @param {Object[]}  Array of news articles 
 * @returns           Array of articles with new field of summarised article contents
 */
const getSummary = (articles) => {
  const promises = createSummaryPromises(articles);
  return Promise.all(promises)
  .then( (responses) => {
    let i = 0;
    for (const response of responses) {
      const summaryAnalysis = response.data.summary;
      articles[i].summary = summaryAnalysis;
      i++;
    }
  })
  .then(() => {
    return articles;
  })
  .catch((error) => {
    error.message = "No summaries could be created";
    throw error;
  });
}

module.exports = {getContents, getSummary};
    


