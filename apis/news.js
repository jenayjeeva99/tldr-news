/**
 * https://newsapi.org/v2/everything?q=bitcoin&apiKey=f1ccd404bda94180a9069d048b9178bc
 * Key = f1ccd404bda94180a9069d048b9178bc
 */
const https = require('https');

const getNewsObjects = function(res, req) {
    const options = createNewsOptions(req.params.title);
    console.log(options);
   
    const newsReq = https.request(options, (newsRes) => {
      let body = [];
      newsRes.on('data',function(chunk) {
          body.push(chunk);
      });
      
      newsRes.on('end', function() {
          res.writeHead(newsRes.statusCode,{'content-type': 'text/html'});
          
          const bodyString = body.join('');
        //   const rsp = JSON.parse(bodyString);
        //   const s = createPage('Flickr Photo Search',rsp);
          res.end(bodyString);
      });
      
    });
   
    newsReq.on('error', (e) => {
        console.error(e);
    });
   
    newsReq.end();   
}


const params = {
    pageSize: 10,
    language: 'en',
    sortBy: 'publishedAt',
    api_key:  process.env.NEWSAPIKEY
  };
  
  function createNewsOptions(query) {
  
    const options = {
        hostname: 'newsapi.org',
        port:     443,
        path:     '/v2/everything?',
        method:   'GET'
    }
  
    const str = 'q=' + query +
                '&pageSize='+ params.pageSize +
                '&language='+ params.language +
                '&sortBy='  + params.sortBy +
                '&apiKey=' + params.api_key;
  
    options.path += str;
    return options;
  }

  module.exports = {getNewsObjects};
  