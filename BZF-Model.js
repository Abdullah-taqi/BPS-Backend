const mongoose = require('mongoose')
const BZFSchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    changePercent: Number
}, {
    collection: 'bzf'
});

module.exports = mongoose.model('Bzf', BZFSchema)