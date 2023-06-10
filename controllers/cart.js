import { Router } from "express";
import {Cart,Product,CartItem} from "../models/index.js";

const router=Router()

router.get('/:userId',async(req,res)=>
{
  const {userId}=req.params
  const cart=await Cart.findOne({where: {UserId: userId}})
  const products=await cart.getProducts()
  return res.json({data:products})
})

router.post('/:userId',async(req,res)=>
{
  const {userId}=req.params
  const {ProductId}=req.body
  try
  {
    const cart=await Cart.findOne({
      where: {UserId: userId},
      include: Product
    })
    const product=await Product.findByPk(ProductId)
    if(await cart.hasProduct(product))
    {
      const cartitem=await CartItem.findOne({
        where:
        {
          CartId: cart.id,
          ProductId
        }
      })
      await cartitem.increment('quantity')
    }
    else await cart.addProduct(product,{through: {quantity: 1}})
    await cart.reload()
    return res.json({data:cart})
  }
  catch(e) { return res.json({err:'something went wrong'}) }
})

router.delete('/:userId',async(req,res)=>
{
  const {userId}=req.params
  try
  {
    const cart=await Cart.findOne({
      where: {UserId: userId}
    })
    await CartItem.destroy({where: {CartId: cart.id}})
    return res.json({data:'success'})
  }
  catch(e) { return res.json({err:'something went wrong'}) }
})

router.delete('/:userId/item',async(req,res)=>
{
  const {userId}=req.params
  const {ProductId}=req.body
  try
  {
    const cart=await Cart.findOne({
      where: {UserId: userId},
      include: Product
    })
    const cartitem=await CartItem.findOne({
      where:
      {
        CartId: cart.id,
        ProductId
      }
    })
    if(cartitem.quantity==1) await cartitem.destroy()
    else await cartitem.decrement('quantity')
    await cart.reload()
    return res.json({data:cart})
  }
  catch(e) { return res.json({err:'something went wrong'}) }
})
export default router