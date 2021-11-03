const Sequelize = require('sequelize');

const db = new Sequelize("postgres://postgres:wAS96sAVY2@127.0.0.1:5432/animal-server");

module.exports = db;