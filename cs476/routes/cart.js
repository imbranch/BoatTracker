const express = require('express');
const path = require('path');

const cartController = require(path.resolve(__dirname, '../controllers/cartController'));
const router = express.Router();

router.get('/getcart', cartController.getCart);
router.delete('/removefromcart', cartController.removeFromCart);
router.get('/getcheckouts', cartController.getCheckouts);
router.post('/checkout', cartController.checkout);
router.put('/return', cartController.return);
router.get('/returns', cartController.getReturns);

module.exports = router;