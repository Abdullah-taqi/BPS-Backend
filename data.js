const mongoose = require('mongoose')
const DataSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    date:String,
    try_yield:String,
    us_inflat:String,
    nasdaq:String,
    mibor:String,
    usd:String,
    brent:String,
    sgx:String,
    cnx:String,
    sensex:String,
    gs:String,
    sdl:String,
    psu_5:String,
    psd_10:String

}, {
    collection: 'market_update'
});

module.exports = mongoose.model('Data', DataSchema)