import { Router } from "express";
import {Order, Product, User} from "../models/index.js";

const router=Router()

router.get('/products', async(_,res)=>
{
  try
  {
    const data = await Product.findAll()
    return res.json({data})
  }
  catch(e)
  {
    console.error(e);
    return res.json({err: 'Cannot fetch products.'})
  }
})

router.get('/orders', async(_,res)=>
{
  try
  {
    const data = await Order.findAll({include: [User,Product]})
    return res.json({data})
  }
  catch(e)
  {
    console.error(e);
    return res.json({err: 'Cannot fetch products.'})
  }
})

export default router