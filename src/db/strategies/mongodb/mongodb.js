const Icrud = require("./../interfaces/interfaceCrud");
const Mongoose = require('mongoose');
const STATUS = {
    0: 'disconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Disconectando'
}

class mongodb extends Icrud{
    constructor(connection, schema){
        super()
        this._connection = connection
        this._schema = schema
    }
    async isConnected(){
        const state = STATUS[this._connection.readyState]
        if (state !== 'Conectando') 
            return state
        await new Promise(resolve => setTimeout(resolve, 1000))
        return STATUS[this._connection.readyState]
    }
    static async connect(){
        Mongoose.connect("mongodb://localhost:27017/yugioh", {
            authSource: "yugioh",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }, function (error) {
            if (!error) return
            console.log('Falha na conexão!', error);
        })
        const connection = Mongoose.connection
        return connection
    }
    createCard(item){
        return this._schema.create(item)
    }
    readCard(data){
        return this._schema.findOne(data)
    }
    updateCard(id, item){
        return this._schema.updateOne({_id: id}, {$set: item})
    }
    deleteCard(id){
        return this._schema.deleteOne({_id: id})
    }
}

module.exports = mongodb