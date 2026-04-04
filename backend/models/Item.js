const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    itemId: { type: String, unique: true },
    itemName: { type: String, required: true },
    categoryId: { type: String },
    shop: { type: String },
    price: { type: Number },
    modelNum: { type: String },
    serialNum: { type: String },
    purchaseDate: { type: Date, required: true },
    lastUpdateDate: { type: Date, required: true },
    lastUpdateUser: { type: String, required: true },
});

// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next();
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
// });

module.exports = mongoose.model('Item', userSchema, "Item");
