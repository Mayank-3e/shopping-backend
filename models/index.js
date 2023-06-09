import User from "./user.js";
import Product from "./products.js";
import Cart from "./cart.js";
import sequelize from "../db.js";
import CartItem from "./cartitems.js";

export default function SyncAll()
{
  // sequelize.drop().then(console.log('Dropped tables'))

  User.sync({force:true})
    .then(console.log('synced User'))

  // Product.sync({force:true})
  Product.sync()
    .then(console.log('synced Product'))

  User.hasOne(Cart)

  Cart.belongsToMany(Product,{through: CartItem})
  Product.belongsToMany(Cart,{through: CartItem})

  // sequelize.sync({force: true})
  sequelize.sync()
  .then(console.log('synced seq'))
}