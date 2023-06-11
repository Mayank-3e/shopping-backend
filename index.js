import express from 'express'
import cors from 'cors'
import SyncAll from './models/index.js';
import { adminRouter, userRouter, cartRouter } from './controllers/index.js'

const app = express();
const port=process.env.PORT||4000
app.use(express.json())
app.use(cors())

SyncAll()

app.use('/admin',adminRouter)
app.use('/users',userRouter)
app.use('/cart',cartRouter)

app.listen(port, e =>
{
  if(e) console.log("Error in server setup");
  else console.log("Server listening on Port",port);
})