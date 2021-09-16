var express = require('express');
var router = express.Router();
var https = require('https');
var axios = require('axios');
const {getNewsObjects} = require('../apis/news');
const {getContents, getSummary} = require('../apis/analysis');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'THIS IS THE NEW TITLE' });
});

router.get('/search/:title', (req, res) => {

  getNewsObjects(req.params.title)  // gets article objects - publisher, author, url, image_url
    .then( (articles) => {
      return getContents(articles); // returns the article with added contents field
    })
    .then( (updatedArticles) => {
      return getSummary(updatedArticles);
    })
    .then( (updatedArticles) => {
      res.send(updatedArticles);
      // res.render('index', {articles: updatedArticles});
    })
    .catch( (error) => {
      console.log(error);
    });
  // contents.forEach(content => console.log(content));

});



  



module.exports = router;
