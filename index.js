import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import authRoute from './routes/authRoute.js'
import postRoute from './routes/postRoute.js'
import uploadRoute from './routes/uploadRoute.js'
import cors from 'cors'

// routes


const app = express()

//Public resource folder
app.use(express.static('public'))
app.use('/images',express.static("images"))


//middleWares
dotenv.config()
app.use(bodyParser.json({extended:true,limit: '50mb'}))
app.use(bodyParser.urlencoded({extended:true,}))
app.use(cors())



const port = process.env.PORT || 5000 
mongoose.connect(process.env.MONGO_DB,{useNewURLParser:true, useUnifiedTopology:true}).then(()=>app.listen(port,()=>console.log(`node server started at ${port}`))).catch((error)=>console.log(error))


//usage of routes

app.use('/auth',authRoute )
app.use('/post',postRoute)
app.use('/upload',uploadRoute)