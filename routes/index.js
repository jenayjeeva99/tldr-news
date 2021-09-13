var express = require('express');
var router = express.Router();
var https = require('https');
var axios = require('axios');
const {getNewsObjects} = require('../apis/news')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/search/:title', (req, res) => {
  // getNewsObjects(req, res);

  getNewsObjects(req.params.title)
  .then(news => {
    res.send(news);
    // console.log(articles);
    return news
  })
  .catch(error => {
    console.log(error.response.statusText);
  });


});



  



module.exports = router;
