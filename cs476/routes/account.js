const express = require('express');
const path = require('path');

const accountController = require(path.resolve(__dirname, '../controllers/accountController'));
const router = express.Router();

router.post('/create', accountController.create);
router.get('/signin', accountController.signIn);
router.put('/updateinfo', accountController.updateInfo);
router.put('/updatefavorites', accountController.updateFavorites);
router.delete('/delete', accountController.delete);

module.exports = router;