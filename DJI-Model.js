const mongoose = require('mongoose')
const DJISchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    changePercent: Number
}, {
    collection: 'dji'
});

module.exports = mongoose.model('Dji', DJISchema)