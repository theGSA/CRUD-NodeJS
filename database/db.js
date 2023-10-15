// const sqlite3 = require('sqlite3').verbose();

// const db = new sqlite3.Database('./database/db.sqlite',(err) => {
//     if (err) {
//       console.error('Erro ao abrir o banco de dados:', err);
//     } else {
//       console.log('Conexão com o banco de dados estabelecida com sucesso.');
//     }
//   });


// module.exports = db;

const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  {
    dialect: 'sqlite',
    storage: './database/db.sqlite',
    logging: false,
    define:{
      timestamps: true,
      freezeTableName: true
    }
  }
)

module.exports = sequelize;