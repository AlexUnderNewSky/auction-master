const {Schema, model} = require('mongoose');

const schema = new Schema({
    name: {type: String, required: true},
    category: {type: Number, required: true},
    instantPrice: {type: Number, required: false},
    photos: {type: Array, required: false},
    creator: {type: String, required: true},
    lastBet: {type: Number, required: true},
    lastBetOwner: {type: String, required: false},
    lotInfo: {type: String, required: true},
    sellerComment: {type: String, required: false},
    date: {type: Date, required: true},
    isClosed: {type: Boolean, required: true}
})

module.exports = model('Lot', schema)