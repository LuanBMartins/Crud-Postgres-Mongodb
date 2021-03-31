const Context = require('./../db/strategies/base/contextStrategy')
const Mongodb = require('./../db/strategies/mongodb/mongodb')
const schemaCard = require('./../db/strategies/mongodb/schemas/cardSchema')
const assert = require('assert')

let context = {}
const CARD_DEFAULT = {
    name: "Dark Magician",
    type: "Spellcaster",
    describe: "The ultimate wizard",
    atk: 2500,
    def: 2100
}
const CARD_UPDATE_DEFAULT = {
    id: 2,
    name: "Dark Magician knight",
    type: "Warrior",
    describe: "N/A",
    atk: 2500,
    def: 2100
}
let MOCK_ID = ''

describe('Mongodb strategy', function(){
    this.beforeAll( async function() {
        const connection = await Mongodb.connect()
        context = new Context(new Mongodb(connection, schemaCard))
        await context.createCard(CARD_UPDATE_DEFAULT)
    })
    this.afterAll(async function(){
        await context.deleteCard(MOCK_ID)
    })
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
    it('read', async ()=> {
        const {name, type, describe, atk, def} = await context.readCard({name: CARD_DEFAULT.name})
        assert.deepStrictEqual({
            name,
            type,
            describe,
            atk,
            def
        }, CARD_DEFAULT)
    })
    it('update', async ()=> {
        const {_id} = await context.readCard({name: CARD_UPDATE_DEFAULT.name})
        MOCK_ID = _id
        const result = await context.updateCard(MOCK_ID, {
            name: "Dark Magician Girl",
            type: "Speelcaster",
            describe: "This card gains 300 ATK for every 'Dark Magician' in either player's Graveyard",
            atk: 2000,
            def: 1700
        })
        assert.deepStrictEqual(result.nModified, 1)
    })
    it('delete', async ()=> {
        const {_id} = await context.readCard({name: CARD_DEFAULT.name})
        const result = await context.deleteCard(_id)
        assert.deepStrictEqual(result.n, 1)
    })
})

