const Sequelize = require("sequelize");

const sequelize = new Sequelize("Solicy-Task-DB", "root", "password123", {
  dialect: "mysql",
  host: "localhost",
  logging: false,
  define: {
    timestamps: false,
  },
});

module.exports = sequelize;
