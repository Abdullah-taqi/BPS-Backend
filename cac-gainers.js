const mongoose = require('mongoose')
const CacGainersSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    date:String,
    symbol:String,
    close:String,
    open:String,
    diff:String,
    

}, {
    collection: 'cac_gainers'
});

module.exports = mongoose.model('Cac', CacGainersSchema)