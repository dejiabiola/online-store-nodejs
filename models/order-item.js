const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const OrderItem = sequelize.define('order-item', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
});

module.exports = OrderItem;
