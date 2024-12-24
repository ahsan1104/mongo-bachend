import express from 'express'
import dotenv from 'dotenv'
import { taskRoute } from './routes/taskRoute.js'
import mongoose from 'mongoose'


const app = express()

dotenv.config()

app.use(express.json())
app.get('/', (req,res)=>{
    res.send('Hello, World!')
})

app.use('/task', taskRoute )

const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
   .then(()=>console.log('Connected to MongoDB'))
   .catch(error=>console.error('Could not connect to MongoDB', error))


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})