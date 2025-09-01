import * as dotenv from 'dotenv'
dotenv.config()
import express, { Request, Response, NextFunction } from 'express'
const app = express()
import morgan from 'morgan'

import jobRoutes from './routes/jobRouter.js'

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
	res.send('hello world')
})

app.post('/', (req: Request, res: Response) => {
	res.json({ message: 'data received', data: req.body })
})

app.use('/api/v1/jobs', jobRoutes)

app.all(/.*/, (req: Request, res: Response) => {
	res.status(404).json({ msg: 'not found' })
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.error(err.stack)
	res.status(500).json({ msg: 'something went wrong' })
})

const port = process.env.PORT || 5000

app.listen(port, () => {
	console.log(`server running on port ${port}`)
})
