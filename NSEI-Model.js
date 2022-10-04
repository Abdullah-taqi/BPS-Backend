const mongoose = require('mongoose')
const NSEISchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    changePercent: Number
}, {
    collection: 'nsei'
});

module.exports = mongoose.model('Nsei', NSEISchema)