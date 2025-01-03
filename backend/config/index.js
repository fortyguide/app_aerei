const { Sequelize } = require('sequelize');
const path = require('path');

// Inizializzazione di Sequelize con SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database.sqlite'),  // Il file di SQLite verrà creato qui
  logging: false // Imposta su true per vedere i log SQL
});

module.exports = sequelize;
