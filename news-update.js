const mongoose = require('mongoose')
const NewsSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    title:String,
    img:String,
    date:String,
    desc:String,
    

}, {
    collection: 'news_update'
});

module.exports = mongoose.model('News', NewsSchema)