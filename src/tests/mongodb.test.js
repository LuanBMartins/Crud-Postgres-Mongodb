const Context = require('./../db/strategies/base/contextStrategy')
const Mongodb = require('./../db/strategies/mongodb')
const assert = require('assert')

const context = new Context(new Mongodb())
const CARD_DEFAULT = {
    name: "Dark Magician",
    type: "Spellcaster",
    describe: "The ultimate wizard",
    atk: 2500,
    def: 2100
}

describe('Mongodb strategy', function(){
    it('connection', async ()=> {
        const result = await context.isConnected()
        assert.deepStrictEqual(result, 'Conectado')
    })
    it('create', async ()=> {
        const {name, type, describe, atk, def} = await context.createCard(CARD_DEFAULT)
        assert.deepStrictEqual({
            name,
            type,
            describe,
            atk,
            def
        }, CARD_DEFAULT)
    })
})