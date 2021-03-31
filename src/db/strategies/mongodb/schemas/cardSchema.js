const Mongoose = require('mongoose')


const cardSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    describe: {
        type: String,
        required: true
    },
    atk: {
        type: Number,
        required: true
    },
    def: {
        type: Number,
        required: true
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }
})

module.exports = Mongoose.model('cards', cardSchema)
