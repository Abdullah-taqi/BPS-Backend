const mongoose = require('mongoose')
const GDAXISchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    changePercent: Number
}, {
    collection: 'gdaxi'
});

module.exports = mongoose.model('GDAXI', GDAXISchema)