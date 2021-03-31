
class notImplementedException extends Error {
    constructor() {
        super('Not implemented Exception')
    }
}

class Icrud {
    createCard() {
        throw new notImplementedException()
    }
    readCard() {
        throw new notImplementedException()
    }
    updateCard() {
        throw new notImplementedException()
    }
    deleteCard() {
        throw new notImplementedException()
    }
    isConnected() {
        throw new notImplementedException()
    }
    static connect() {
        throw new notImplementedException()
    }
    defineModels() {
        throw new notImplementedException()
    }
}

module.exports = Icrud