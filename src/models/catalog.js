const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const catalog = sequelize.define("catalog", {
  ID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  url: Sequelize.STRING,
  cost1: Sequelize.INTEGER,
  cost2: Sequelize.INTEGER,
  cost3: Sequelize.INTEGER,
  req1: Sequelize.INTEGER,
  req2: Sequelize.INTEGER,
  req3: Sequelize.INTEGER,
  category: Sequelize.INTEGER,
});

module.exports = catalog;
