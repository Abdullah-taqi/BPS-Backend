const mongoose = require('mongoose')
const CareersSchema = new mongoose.Schema({
}, {
    collection: 'careers'
});

module.exports = mongoose.model('careers', CareersSchema)