const { default: axios } = require('axios');
const https = require('https');

// const getNewsObjects = (req, res) => {
//     const options = createNewsOptions(req.params.title);
//     // console.log(options);
   
//     const newsReq = https.request(options, (newsRes) => {
//       let body = [];
//       newsRes.on('data',function(chunk) {
//           body.push(chunk);
//       });
      
//       newsRes.on('end', function() {
//           res.writeHead(newsRes.statusCode,{'content-type': 'application/json'});
          
//           const bodyString = body.join('');
//         //   const rsp = JSON.parse(bodyString);
//         //   const s = createPage('Flickr Photo Search',rsp);
//         // console.log(JSON.parse(bodyString));
//           res.end(bodyString);
//       });
      
//     });
   
//     newsReq.on('error', (e) => {
//         console.error(e.message);
//     });
   
//     newsReq.end();   
// }

const getNewsObjects = (query) => {
    return axios
    .get("https://newsapi.org/v2/everything?" +"q=" + query + 
    "&pageSize=10" + "&language=en" + "&sortBy=relevancy" + 
    "&apiKey=" + process.env.NEWSAPIKEY)
    .then(response => {
        return response.data.articles;
    })
    .catch(error => {
        console.log(error.response.statusText);
    });
};


const params = {
    pageSize: 10,
    language: 'en',
    sortBy: 'relevancy',
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
  