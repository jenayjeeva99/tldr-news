var express = require('express');
var router  = express.Router();
var https   = require('https');
var axios   = require('axios');
const {getNewsObjects} = require('../apis/news');
const {getContents, getSummary} = require('../apis/analysis');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/search/', function(req, res) {
  let topic   = req.query.topic;
  let summary = req.query.contents;
  getNewsObjects(topic)  // gets article objects - publisher, author, url, image_url
    .then ((articles)   =>  getContents(articles))
    .then ((articlesV2) =>  getSummary(articlesV2))
    .then ((articlesV3) => {
      // res.send(articlesV3);
      res.render('news', {articles: articlesV3, summary: summary});
    })
    .catch( (error) => {
      console.log(error);
    });
});



  



module.exports = router;
