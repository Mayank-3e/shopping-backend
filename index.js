import express from 'express'
import cors from 'cors'
import Product from './models/products.js';

const app = express();
const port=process.env.PORT||4000
app.use(express.json())
app.use(cors())

app.get('/', async(_,res)=>
{
  try
  {
    const data = await Product.findAll()
    return res.json({data})
  }
  catch(e)
  {
    console.error(e);
    return res.json({err: 'Cannot fetch.'})
  }
})

app.listen(port, e =>
{
  if(e) console.log("Error in server setup");
  else console.log("Server listening on Port",port);
})