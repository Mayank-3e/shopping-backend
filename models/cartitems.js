import { DataTypes } from "sequelize";
import sequelize from "../db.js";

export const CartItem = sequelize.define('CartItem',{
  quantity: DataTypes.INTEGER
})