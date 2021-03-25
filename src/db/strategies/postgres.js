const Icrud = require('./interfaces/interfaceCrud')
const Sequelize = require('sequelize')

class postgres extends Icrud {
    constructor() {
        super()
        this._driver = null
        // this._deck = null 
        this._card = null
        this.connect()
    }
    async createCard(item){
        const {dataValues} = await this._card.create(item)
        return dataValues
    }
    readCard(id = {}){
        return this._card.findAll({where: id, raw: true})
    }
    updateCard(id, item){
        return this._card.update(item, {where: {id: id}})
    }
    deleteCard(id){
        const query = id ? {id} : {}
        return this._card.destroy({where: query})
    }
    async connect(){
        this._driver = new Sequelize(
            'yugioh v.1',
            'luanbm', 
            '123443210', {
                host: 'localhost',
                dialect: 'postgres'
            }
        )
        await this.defineModel()
    }
    async isConnected(){
        try {
            await this._driver.authenticate()
            console.log('Connection has been established successfully');
            return true
        } catch(error) {
            console.log(error);
            return false
        }
    }
    async defineModel(){
        this._card = this._driver.define('Card', {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true     
            },
            name: {
                type: Sequelize.TEXT,
                required: true
            },
            type: {
                type: Sequelize.TEXT,
                required: true
            },
            describe: {
                type: Sequelize.TEXT,
                required: true
            },
            atk: {
                type: Sequelize.INTEGER,
                required: true
            },
            def: {
                type: Sequelize.INTEGER,
                required: true
            }
        }, {
            tableName: 'card',
            freezeTableName: false,
            timestamps: false
        })
        await this._card.sync()
    }
}

module.exports = postgres