import express from 'express'
import cors from 'cors'
import Product from './models/products.js';
import SyncAll from './models/index.js';
import userRouter from './controllers/users.js';

const app = express();
const port=process.env.PORT||4000
app.use(express.json())
app.use(cors())

SyncAll()

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

app.use('/users',userRouter)

app.listen(port, e =>
{
  if(e) console.log("Error in server setup");
  else console.log("Server listening on Port",port);
})