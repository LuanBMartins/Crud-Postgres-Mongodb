const Icrud = require('./../interfaces/interfaceCrud')
const Sequelize = require('sequelize')

class postgres extends Icrud {
    constructor(connection, schema) {
        super()
        this._connection = connection
        this._schema = schema
    }
    async isConnected(){
        try {
            await this._connection.authenticate()
            return true
        } catch(error) {
            console.log(error);
            return false
        }
    }
    static async connect(){
        const connection = new Sequelize(
            'yugioh v.1', //database
            'user', 
            'password', {
                host: 'localhost',
                dialect: 'postgres',
                logging: false,
            }
        )
        return connection
    }
    static async defineModel(connection, schema){
        const model = connection.define(
            schema.name, schema.schema, schema.options
        )
        await model.sync()
        return model
    }
    async createCard(item){
        const {dataValues} = await this._schema.create(item)
        return dataValues
    }
    readCard(id = {}){
        return this._schema.findAll({where: id, raw: true})
    }
    updateCard(id, item){
        return this._schema.update(item, {where: {id: id}})
    }
    deleteCard(id){
        const query = id ? {id} : {}
        return this._schema.destroy({where: query})
    }
}

module.exports = postgres