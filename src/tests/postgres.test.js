const ConstextStrategy = require('./../db/strategies/base/contextStrategy')
const Postgres = require('./../db/strategies/postgres')
const assert = require('assert')

const context = new ConstextStrategy(new Postgres())
const CARD_DEFAULT = {
    id: 1,
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

describe('Postgres strategy', function() {
    this.beforeAll(async function(){
        await context.createCard(CARD_UPDATE_DEFAULT)
    })
    this.afterAll(async function(){
        await context.deleteCard()
    })
    it('Postgres connection', async function(){
        const result = await context.isConnected()
        assert.strictEqual(result, true)
    })
    it('create', async function(){
        const result = await context.createCard(CARD_DEFAULT)
        assert.deepStrictEqual(result, CARD_DEFAULT)
    })
    it('read', async function(){
        const [result] = await context.readCard(CARD_DEFAULT.id)
        assert.deepStrictEqual(result, CARD_DEFAULT)
    })
    it('update', async function(){
        const CARD_UPDATE = {
            ...CARD_UPDATE_DEFAULT,
            name: "Dark Magician Girl",
            type: "Speelcaster",
            describe: "This card gains 300 ATK for every 'Dark Magician' in either player's Graveyard",
            atk: 2000,
            def: 1700
        }
        const [result] = await context.updateCard(CARD_UPDATE_DEFAULT.id, CARD_UPDATE)
        const [resultTwo] = await context.readCard(CARD_UPDATE.id)
        assert.deepStrictEqual(result, 1)
        assert.deepStrictEqual(resultTwo, CARD_UPDATE)
    })
    it('delete', async function(){
        const result = await context.deleteCard(CARD_DEFAULT.id)
        assert.deepStrictEqual(result, 1)
    })
})

describe('MongoDb strategy', function(){
    it('', function(){
        
    })
})