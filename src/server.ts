import * as dotenv from 'dotenv'
dotenv.config()

import express, {
	Request,
	Response,
	NextFunction,
	ErrorRequestHandler,
} from 'express'
import morgan from 'morgan'
import jobRoutes from './routes/jobRouter.js'
import authRoutes from './routes/authRouter.js'
import userRoutes from './routes/userRouter.js'
import mongoose from 'mongoose'
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js'
import { authenticateUser } from './middleware/authMiddleware.js'
import cookieParser from 'cookie-parser'

declare module 'express-serve-static-core' {
	interface Request {
		user?: {
			userId: string
			role: string
		}
	}
}

const app = express()

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

// cookie parser
app.use(cookieParser())

// body parser
app.use(express.json())

// routes
app.get('/', (req: Request, res: Response) => {
	res.send('hello world')
})

app.use('/api/v1/jobs', authenticateUser, jobRoutes)

app.use('/api/v1/users', authenticateUser, userRoutes)
app.use('/api/v1/auth', authRoutes)

// 404 handler
app.use((req: Request, res: Response) => {
	res.status(404).json({ msg: 'not found' })
})

// global error handler

app.use(errorHandlerMiddleware)

// start server
const port = process.env.PORT || 5000

const start = async () => {
	try {
		if (!process.env.MONGO_URL) {
			throw new Error('MONGO_URL is missing in .env')
		}

		await mongoose.connect(process.env.MONGO_URL)
		console.log('Connected to MongoDB ✅')

		app.listen(port, () => {
			console.log(`Server running on port ${port}`)
		})
	} catch (error) {
		console.error('Failed to start server ❌', error)
		process.exit(1)
	}
}

start()
