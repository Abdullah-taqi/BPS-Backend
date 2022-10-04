const mongoose = require('mongoose')
const MospiSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    title:String,
    date:String,
    link:String,
}, {
    collection: 'mospi_updates'
});

module.exports = mongoose.model('Mospi', MospiSchema)