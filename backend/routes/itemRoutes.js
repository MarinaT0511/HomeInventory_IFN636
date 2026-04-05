
const express = require('express');
const {
    getItemList,
    getItemDetail,
    createItem,
    updateItem,
    deleteItem
} = require('../controllers/itemController');
const router = express.Router();

router.get('/itemlist', getItemList);
router.get('/:itemId', getItemDetail);
router.post('/', createItem);
router.put('/:itemId', updateItem);
router.delete('/:itemId', deleteItem);

module.exports = router;
