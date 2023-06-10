import { User } from "./user.js";
import { Product } from "./products.js";
import { Cart } from "./cart.js";
import { CartItem } from "./cartitems.js";
import sequelize from "../db.js";

export default function SyncAll()
{
  // sequelize.drop().then(console.log('Dropped tables'))

  // User.sync({force:true})
  User.sync()
    .then(console.log('synced User'))

  // Product.sync({force:true})
  Product.sync()
    .then(console.log('synced Product'))

  User.hasOne(Cart)
  Cart.belongsTo(User)

  Cart.belongsToMany(Product,{through: CartItem})
  Product.belongsToMany(Cart,{through: CartItem})

  // CartItem.sync({force:true})
  // CartItem.sync()
  //   .then(console.log('synced Cartitems'))

  // sequelize.sync({force: true})
  sequelize.sync()
    .then(console.log('synced seq'))
}
export {User,Product,Cart,CartItem}