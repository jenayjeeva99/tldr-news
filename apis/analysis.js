// const { default: axios } = require('axios');
var axios = require("axios").default;
var qs = require("qs");


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

const getContents = (articles) => {
  const promises = createContentsPromises(articles);
  return Promise.all(promises)
  .then( (responses) => {
    let i = 0;
    for (const response of responses) {
      try {
        const textContent = response.data.website.contents;
        if (textContent === "") throw error;
        articles[i].content = createFullTextString(textContent);
        i++;
      }
      catch {
        articles[i].error = "No content in this article provided";
      }
    }
  })
  .then(() => articles)
  .catch((error) => {
    console.log(error.response);
  });
}

const createFullTextString = (paragraphs) => {
  let i = 0;
  paragraphs.forEach((paragraph) => {
    paragraphs[i] = paragraph+' \n\n ';
    i++;
  });
  const fulltext = paragraphs.join('');
  return fulltext;
};

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

const getSummary = (articles) => {
  const promises = createSummaryPromises(articles);
  return Promise.all(promises)
  .then( (responses) => {
    let i = 0;
    for (const response of responses) {
      try {
        const summaryAnalysis = response.data.summary;
        articles[i].summary = summaryAnalysis;
        i++;
      }
      catch {
        articles[i].error = "No sentiment could be provided";
      }
    }
  })
  .then(() => {
    return articles;
  })
  .catch((error) => {
    console.log(error.response);
  });
}


module.exports = {getContents, getSummary};
    


