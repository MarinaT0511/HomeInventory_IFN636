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
        console.error('getItemList error:', error);
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
        console.error('getItemDetail error:', error);
        res.status(500).json({ message: error.message });
    }
};

//Create item detail
const createItem = async (req, res) => {
    console.log("req.user:", req.user);
    const {
        itemName,
        category,
        shop,
        price,
        modelNum,
        serialNum,
        purchaseDate
    } = req.body;
    try {
        console.log("start create")

        // generate ID 
        const lastItem = await Item.findOne().sort({ itemId: -1 });
        let nextNumber = 1;
        if (lastItem && lastItem.itemId) {
            nextNumber = parseInt(lastItem.itemId.replace('I', ''), 10) + 1;
        }
        const itemId = 'I' + String(nextNumber).padStart(3, '0');

        //Making data to create
        const newItem = await Item.create({
            itemId,
            itemName,
            category,
            shop,
            price,
            modelNum,
            serialNum,
            purchaseDate,
            lastUpdateDate: new Date(),
            lastUpdateUser: req.user?.userId || "U000"
        });
        res.status(201).json(newItem);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
};


//Update item detail
const updateItem = async (req, res) => {
    console.log("req.user:", req.user);
    try {
        console.log("start update")
        const item = await Item.findOne({ itemId: req.params.itemId });
        if (!item) return res.status(400).json({ message: 'Item not found' });

        const {
            itemName,
            category,
            shop,
            price,
            modelNum,
            serialNum,
            purchaseDate
        } = req.body;
        item.itemName = itemName ?? item.itemName;
        item.category = category ?? item.category;
        item.shop = shop ?? item.shop;
        item.price = price ?? item.price;
        item.modelNum = modelNum ?? item.modelNum;
        item.serialNum = serialNum ?? item.serialNum;
        item.purchaseDate = purchaseDate ?? item.purchaseDate;
        item.lastUpdateDate = new Date(),
            item.lastUpdateUser = req.user?.userId ?? "U000";

        const updatedItem = await item.save();
        res.json(updatedItem);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
};

//Delete item detail
const deleteItem = async (req, res) => {
    console.log("req.user:", req.user);
    try {
        console.log("starting delete")
        const item = await Item.findOneAndDelete({ itemId: req.params.itemId });
        // if (!item) return res.status(400).json({ message: 'Item not found' });
        // res.json({ item });
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json({ message: 'Item deleted' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
};



module.exports = {
    getItemList,
    getItemDetail,
    createItem,
    updateItem,
    deleteItem
};
