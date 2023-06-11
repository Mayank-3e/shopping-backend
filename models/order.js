import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Order = sequelize.define('Order',{totalAmount: DataTypes.INTEGER})
export default Order