import express from 'express'
import { PORT } from './config.js'
import userRoutes from './routes/users.routes.js'
import morgan from 'morgan'
import cors from 'cors'

const app = express()

/* 🔰 CONFIG CORS */
const configCors = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(configCors))
app.use(morgan('dev'))
app.use(express.json())
app.use(userRoutes)

app.listen(PORT)
console.log(`Server in ${PORT} - OK`)
