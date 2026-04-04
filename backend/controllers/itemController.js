const Item = require('../models/Item');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

//get all items for item list 
const getItemList = async (req, res) => {
    try {
        const item = await Item.find();
        console.log('Items found:', item);
        res.status(200).json(item);
    } catch (error) {
        console.error('getItemDetail error:', error);
        res.status(500).json({ message: error.message });
    }
};

//get item detail for item detail page 
const getItemDetail = async (req, res) => {
    try {
        console.log("param:", req.params.itemId);
        const item = await Item.findOne({ itemId: req.params.itemId });
        console.log('Items found:', item);

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }


        res.status(200).json(item);
    } catch (error) {
        console.error('getItemList error:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getItemList,
    getItemDetail
};
