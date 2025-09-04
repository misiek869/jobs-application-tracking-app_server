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
import mongoose from 'mongoose'

const app = express()

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

// body parser
app.use(express.json())

// routes
app.get('/', (req: Request, res: Response) => {
	res.send('hello world')
})

app.post('/', (req: Request, res: Response) => {
	res.json({ message: 'data received', data: req.body })
})

app.use('/api/v1/jobs', jobRoutes)

// 404 handler
app.use((req: Request, res: Response) => {
	res.status(404).json({ msg: 'not found' })
})

// global error handler
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
	console.error(err.stack || err)
	res.status(500).json({ msg: 'something went wrong' })
}
app.use(errorHandler)

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
