import { Router } from "express";
import User from "../models/user.js";

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
  const name=req.body.name
  if(!name) return res.json({err: 'Name is needed.'})
  try
  {
    const data = await User.create({name},{ignoreDuplicates: true})
    return res.json({data})
  }
  catch(e)
  {
    console.error(e);
    return res.json({err: 'Cannot create user.'})
  }
})

export default router