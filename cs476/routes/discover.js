const express = require('express');
const path = require('path');

const discoverController = require(path.resolve(__dirname, '../controllers/discoverController'));
const router = express.Router();

router.get('/search', discoverController.search)
router.get('/book/:bookid', discoverController.getBook);
router.post('/addtocart', discoverController.addToCart);

module.exports = router;