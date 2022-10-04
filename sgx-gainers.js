const mongoose = require('mongoose')
const SgxGainersSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    date:String,
    symbol:String,
    close:String,
    open:String,
    diff:String,
    

}, {
    collection: 'sgx_gainers'
});

module.exports = mongoose.model('Sgx', SgxGainersSchema)