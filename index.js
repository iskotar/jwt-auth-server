import express from 'express'
import cookieParser from 'cookie-parser'
import { config } from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import router from './src/router/index.js'
import errorMiddleware from './src/middleware/errorMiddleware.js'


config() //read configuration from .env file

const PORT = process.env.PORT || 5000;

const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}));
app.use('/api', router)
app.use(errorMiddleware)

const startServer = async () => {
  try{

    await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

  }catch (e) {
    console.log(e)
  }
}

startServer()
