
const Sequelize = require('sequelize')
const db = require('../database/db');

const Nivel = db.define('Nivel',{
    Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    Nome: {
        type: Sequelize.STRING
    },
    Descricao: {
        type: Sequelize.STRING
    },
})
db.sync();
module.exports = Nivel;