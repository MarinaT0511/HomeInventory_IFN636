
const express = require('express');
const {
    getItemList,
    getItemDetail
} = require('../controllers/itemController');
const router = express.Router();

router.get('/itemlist', getItemList);
router.get('/:itemId', getItemDetail);

module.exports = router;
