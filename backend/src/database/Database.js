const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const Connection = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST ,
    dialect: 'mysql',
    quoteIdentifiers: false,
    timezone: '-03:00', //horário do brasil
    define: {
        syncOnAssociation: true,
        freezeTableName: true
    }
});

module.exports = {
    Sequelize,
    Connection
};
