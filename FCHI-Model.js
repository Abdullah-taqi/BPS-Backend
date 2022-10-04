const mongoose = require('mongoose')
const FCHISchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    changePercent: Number
}, {
    collection: 'fchi'
});

module.exports = mongoose.model('Fchi', FCHISchema)