const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("ASSIGNMENT_08", "local_user", "password", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
