const mongoose = require('mongoose')
const MorningSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    headings:Array,
    link:String,
    date:String,
    

}, {
    collection: 'morning_scan'
});

module.exports = mongoose.model('Morning', MorningSchema)