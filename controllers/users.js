import { Router } from "express";
import User from "../models/user.js";
import Cart from "../models/cart.js";

const router=Router()

router.get('/',async(req,res)=>
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

export default router