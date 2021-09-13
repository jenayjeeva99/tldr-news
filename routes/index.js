var express = require('express');
var router = express.Router();
var https = require('https');
const {getNewsObjects} = require('../apis/news')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/search/:title', (req, res) => {
  getNewsObjects(res, req);
});



  



module.exports = router;
