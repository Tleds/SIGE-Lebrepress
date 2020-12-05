const Sequelize = require('sequelize');
const config = require('../config/database');

const Orders = require('./Orders');
const Users = require('./Users');
const UserAddress = require('./UserAddress');


const connection = new Sequelize(config);

Orders.init(connection);
Users.init(connection);
UserAddress.init(connection);

Users.associate(connection.models);


module.exports = connection;
