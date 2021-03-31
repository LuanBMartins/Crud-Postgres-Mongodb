const Sequelize = require('sequelize')


const schemaCard = {
    name: "card",
    schema: {
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
    },
    options: {
        tableName: 'card',
        freezeTableName: false,
        timestamps: false
    }
}
module.exports = schemaCard