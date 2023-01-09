import 'express-async-errors'

import { errorMiddleware } from '@middleware/errors/error-middleware'
import cors from 'cors'
import express from 'express'

import { userRoutes } from './routes/user-routes'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/users', userRoutes)

app.use(errorMiddleware)

export { app }