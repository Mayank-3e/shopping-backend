import express from 'express'
import cors from 'cors'

const app = express();
const port=process.env.PORT||4000
app.use(express.json())
app.use(cors())

app.get('/', (_,res)=>
{
  res.send("hi")
})

app.listen(port, e =>
{
  if(e) console.log("Error in server setup");
  else console.log("Server listening on Port",port);
})