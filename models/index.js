import User from "./user.js";
import Product from "./products.js";
import Cart from "./cart.js";
import CartItem from "./cartitems.js";
import Order from "./order.js";
import sequelize from "../db.js";
import OrderedProducts from "./ordered-products.js";

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
  CartItem.sync()
    .then(console.log('synced Cartitems'))

  User.hasMany(Order)
  Order.belongsTo(User)
  // Order.sync({force:true}).then(console.log('synced Orders'))
  Order.sync().then(console.log('synced Orders'))

  Order.belongsToMany(Product,{through: OrderedProducts})
  Product.belongsToMany(Order,{through: OrderedProducts})
  // OrderedProducts.sync({force:true}).then(console.log('synced OrderedProducts'))
  OrderedProducts.sync().then(console.log('synced OrderedProducts'))

  // sequelize.sync({force: true})
  sequelize.sync()
    .then(console.log('synced seq'))
}
export {User,Product,Cart,CartItem,Order}