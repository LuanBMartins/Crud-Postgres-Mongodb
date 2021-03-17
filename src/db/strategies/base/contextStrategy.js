const  Icrud  = require('./../interfaces/interfaceCrud')


class ConstextStrategy extends Icrud {
    constructor(strategy){
        super()
        this._database = strategy
    }
    createCard(item) {
        return this._database.createCard(item)
    }
    readCard(id) {
        return this._database.readCard(id)
    }
    updateCard(id, item) {
        return this._database.updateCard(id, item)
    }
    deleteCard(id) {
        return this._database.deleteCard(id)
    }
    isConnected() {
        return this._database.isConnected()
    }
} 

module.exports = ConstextStrategy
