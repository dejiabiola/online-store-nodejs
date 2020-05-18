const Sequelize = require('sequelize')

const sequelize = new Sequelize('node-shop', 'root', 'aa270494', {
  dialect: 'mysql',
  host: 'localhost'
})


module.exports = sequelize;