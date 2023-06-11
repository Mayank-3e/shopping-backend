import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const CartItem = sequelize.define('CartItem',{
  quantity: DataTypes.INTEGER
})
export default CartItem