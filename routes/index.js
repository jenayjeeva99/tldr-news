var express = require('express');
var router = express.Router();
var https = require('https');
var axios = require('axios');
const {getNewsObjects} = require('../apis/news')
const {postAnalysis} = require('../apis/analysis')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'THIS IS THE NEW TITLE' });
});

router.get('/search/:title', (req, res) => {
  // getNewsObjects(req, res);
  getNewsObjects(req.params.title)
  .then(articles => {
    postAnalysis(articles[0].url);
    res.send(articles);
  })
  .catch(error => {
    console.log(error.response.statusText);
  });

});



  



module.exports = router;
