const Sequelize = require('sequelize');
const db = require('../database/db');

const Card = db.define('Card', {
    Id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    Nome:{
        type: Sequelize.STRING
    },
    Descricao:{     type: Sequelize.STRING },
    IdClan: {       type: Sequelize.INTEGER},
    IdNivel: {      type: Sequelize.INTEGER},
    IdAldeia : {    type: Sequelize.INTEGER},
    Imagem:     {   type: Sequelize.BLOB},
    TipoImagem: {   type: Sequelize.STRING },
    NomeImagem : {  type: Sequelize.STRING},
});

module.exports = Card;