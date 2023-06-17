import  express  from "express"
import dotenv from 'dotenv'
dotenv.config();
import connectDB from "./config/db.js"
import { notFound,errorHandler } from "./middleware/errorMiddleware.js"

const port = process.env.PORT || 5000



connectDB();


const app = express()







app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.use(notFound)
app.use(errorHandler)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})