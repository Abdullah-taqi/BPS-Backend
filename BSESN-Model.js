const mongoose = require('mongoose')
const BSESNSchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    changePercent: Number
}, {
    collection: 'bsesn'
});

module.exports = mongoose.model('Bsesn', BSESNSchema)