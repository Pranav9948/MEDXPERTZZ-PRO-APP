import  express  from "express"
import path from 'path'
import dotenv from 'dotenv'
import connectDB from "./config/db.js"
import uploadRoutes from './routes/uploadRoutes.js'
import userRoutes from './routes/userRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import doctorRoutes from './routes/doctorRoutes.js'

import { notFound,errorHandler } from "./middleware/errorMiddleware.js"
import cookieParser from "cookie-parser"

dotenv.config()
connectDB()

const app = express()
const port = process.env.PORT || 5000


//Body Parser Middleware 

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//ccokie parser middleware

app.use(cookieParser())



app.use('/api/users',userRoutes)
 app.use('/api/uploads',uploadRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/doctors',doctorRoutes) 

// app.use('/api/orders',orderRoutes)
// app.use('/api/upload',uploadRoutes)
// app.use('/api/products',productsRoutes)

const __dirname=path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


app.use(notFound)
app.use(errorHandler)




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})