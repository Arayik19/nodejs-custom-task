const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const user = require("./user");

const asset = sequelize.define("asset", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  type: { type: Sequelize.INTEGER, min: 1, max: 3 },
  level: { type: Sequelize.INTEGER, min: 1, max: 10 },
});

asset.hasOne(user, {
  foreignKey: "address",
});

module.exports = asset;
