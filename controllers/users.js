import { Router } from "express";
import {User,Cart,Order, Product} from "../models/index.js";

const router=Router()

router.get('/',async(_,res)=>
{
  try
  {
    const data = await User.findAll()
    return res.json({data})
  }
  catch(e)
  {
    console.error(e);
    return res.json({err: 'Cannot fetch users.'})
  }
})

router.post('/',async(req,res)=>
{
  const {name}=req.body
  if(!name) return res.json({err: 'Name is needed.'})
  let user
  try
  {
    user=await User.create({name},{ignoreDuplicates: true})
  }
  catch(e)
  {
    console.error(e);
    return res.json({err: 'Cannot create user.'})
  }
  // add cart for user
  try
  {
    await user.createCart()
    return res.json({data:user})
  }
  catch(e)
  {
    console.error(e);
    return res.json({err: 'Cannot create user cart.'})
  }
})

router.get('/:userId/bill',async(req,res)=>
{
  const {userId}=req.params
  try
  {
    const cart=await Cart.findOne({where: {UserId: userId}})
    let products=await cart.getProducts()
    let totalAmount=0
    products=products.map(item=>
      {
        const {id,category,name,price,taxCategory,taxAmount}=item
        const quantity=item.CartItem.quantity
        totalAmount+=price+taxAmount
        return {id,category,name,price,taxCategory,taxAmount,quantity}
      })
    return res.json({data:
      {
        products,
        totalAmount
      }
    })
  }
  catch (e) {return res.json({err: 'something went wrong'})}
})

router.post('/:userId/confirm',async(req,res)=>
{
  const {userId}=req.params
  try
  {
    const user=await User.findByPk(userId,{
      include:{
        model: Cart,
        include: {model: Product}
      }
    })
    const products=user.Cart.Products
    let totalAmount=0
    const bill=products.map(item=>
    {
      const {id,category,name,price,taxCategory,taxAmount}=item
      const quantity=item.CartItem.quantity
      totalAmount+=price+taxAmount
      return {id,category,name,price,taxCategory,taxAmount,quantity}
    })
    const order=await user.createOrder({totalAmount})
    await order.addProducts(products)
    return res.json({data:order})
  }
  catch (e)
  {
    console.error(e);
    return res.json({err: 'something went wrong'})
  }
})
export default router