import { Sequelize } from "sequelize";
import sequelize from "../config/db.js";

const { DataTypes } = Sequelize

const Users = sequelize.define('users', {
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  refresh_Token: {
    type: DataTypes.TEXT,
  },
}, {
  freezeTableName: true,
});

export default Users;