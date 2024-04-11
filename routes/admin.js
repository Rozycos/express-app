const express = require('express');
const path = require('path');
const router = express.Router();

/* GET admin page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'public', 'builds', 'admin', 'index.html'));
});

module.exports = router;