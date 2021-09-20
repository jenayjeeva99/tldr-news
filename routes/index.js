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
  getNewsObjects(topic)  // gets article objects - publisher, author, url, image_url
    .then ((articles)   =>  getContents(articles)) // update article objects with contents field
    .then ((articlesV2) =>  getSummary(articlesV2)) // update articles objects with summaries of contents
    .then ((articlesV3) => {
      // res.send(articlesV3);
      res.render('news', {articles: articlesV3, summary: summary});
    })
    .catch( (error) => {
      res.render('news', {error: error.message});
    });
});



  



module.exports = router;
