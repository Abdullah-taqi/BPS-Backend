const mongoose = require('mongoose')
const SpGainersSchema = new mongoose.Schema({}, {
    collection: 'sp_gainers'
});

module.exports = mongoose.model('Sp', SpGainersSchema)