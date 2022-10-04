const mongoose = require('mongoose')
const NiftyGainersSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    date:String,
    symbol:String,
    close:String,
    open:String,
    diff:String,
    

}, {
    collection: 'nifty_gainers'
});

module.exports = mongoose.model('Nifty', NiftyGainersSchema)