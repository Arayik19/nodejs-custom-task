const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const user = require("./user");

const product = sequelize.define("product", {
  address: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
  },
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
});

product.hasOne(user, {
  foreignKey: "address",
});

module.exports = product;
