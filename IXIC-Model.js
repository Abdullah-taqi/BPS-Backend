const mongoose = require('mongoose')
const IXICSchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    changePercent: Number
}, {
    collection: 'ixic'
});

module.exports = mongoose.model('Ixic', IXICSchema)