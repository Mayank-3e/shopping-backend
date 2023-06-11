import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Product = sequelize.define('Product',
{
  category: DataTypes.ENUM('product','service'),
  name:
  {
    type: DataTypes.STRING,
    allowNull: false
  },
  price:
  {
    type: DataTypes.INTEGER,
    validate:
    {
      min: 100,
      max: 1e4
    }
  },
  taxCategory: DataTypes.ENUM('PA','PB','PC','SA','SB','SC'),
  taxAmount: DataTypes.INTEGER
},
{
  indexes:[{
    unique: true,
    fields: ['name','category']
  }]
});
export default Product