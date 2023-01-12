import 'express-async-errors'

import { errorMiddleware } from '@middleware/errors/error-middleware'
import { authRoutes } from '@routes/auth-routes'
import { userRoutes } from '@routes/user-routes'
import cors from 'cors'
import express from 'express'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/users', userRoutes)
app.use('/auth', authRoutes)

app.use(errorMiddleware)

export { app }