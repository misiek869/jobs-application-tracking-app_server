import * as dotenv from 'dotenv'
dotenv.config()
import express, { Request, Response, NextFunction } from 'express'
const app = express()
import morgan from 'morgan'

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

// GET ALL JOBS
app.get('/api/v1/jobs')

// GET SINGLE JOB
app.get('/api/v1/jobs/:id')

// CREATE JOB
app.post('/api/v1/jobs')

// EDIT JOB
app.patch('/api/v1/jobs/:id')

// DELETE JOB
app.delete('/api/v1/jobs/:id')

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
