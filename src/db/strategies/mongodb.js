const Icrud = require("./interfaces/interfaceCrud");
const Mongoose = require('mongoose');
const STATUS = {
    0: 'disconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Disconectando'
}

class mongodb extends Icrud{
    constructor(){
        super()
        this._driver = null
        this._card = null
        this.connect()
    }
    createCard(item){
        return this._card.create(item)
    }
    async isConnected(){
        const state = STATUS[this._driver.readyState]
        if (state !== 'Conectando') return state
        await new Promise(resolve => setTimeout(resolve, 1000))
        return STATUS[this._driver.readyState]
    }
    connect(){
        Mongoose.connect("mongodb://localhost:27017/yugioh", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, function (error) {
            if (!error) return
            console.log('Falha na conexão!', error);
        })
        this._driver = Mongoose.connection
        this.defineModels()
    }
    defineModels(){
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
        this._card = Mongoose.model('cards', cardSchema)
    }
}

module.exports = mongodb