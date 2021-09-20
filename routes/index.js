var express = require('express');
var router  = express.Router();
const {getNewsObjects} = require('../apis/news');
const {getContents, getSummary} = require('../apis/analysis');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET search page */
router.get('/search/', function(req, res) {
  let topic   = req.query.topic;
  let summary = req.query.contents;
  getNewsObjects(topic)       // gets article objects - source, author, url, image_url
    .then ((articles)   =>  { // update article objects with text contents field
      return getContents(articles)
    }) 
    .then ((articlesV2) =>  { // update articles objects with summaries of contents
      return (summary === "summary") ? getSummary(articlesV2) : articlesV2
    }) 
    .then ((articlesV3) => {  // render news page
      res.render('news', {articles: articlesV3, summary: summary}); 
    })
    .catch( (error) => {      // render news page with error message
      res.render('news', {error: error.message}); 
    });
});



  



module.exports = router;
