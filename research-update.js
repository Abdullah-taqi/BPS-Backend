const mongoose = require('mongoose')
const ResearchSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    link:String,
    date:String,
    title:String,
    
    

}, {
    collection: 'research_update'
});

module.exports = mongoose.model('Research', ResearchSchema)