import { Sequelize } from "sequelize";
import sequelize from "../config/db.js";

const { DataTypes } = Sequelize

const Product = sequelize.define('products', {
  name: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.STRING,
  },
  stock: {
    type: DataTypes.INTEGER,
  },
  colour: {
    type: DataTypes.STRING,
  },
}, {
  freezeTableName: true,
});

export default Product;
