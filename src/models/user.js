const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const user = sequelize.define("user", {
  address: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
  },
  cash1: Sequelize.FLOAT,
  cash2: Sequelize.FLOAT,
  cash3: Sequelize.FLOAT,
});

module.exports = user;
