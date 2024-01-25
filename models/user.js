

const sequelize = require("../config/dbConfig.js");

const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(60),
    },
    password: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
  },
  {
    tableName: "User",
    timestamps: false,
  },
);

User.sync();

module.exports = { User };
