import * as dotenv from 'dotenv'
dotenv.config()
import express, { Request, Response } from 'express'
const app = express()
import morgan from 'morgan'
import { nanoid } from 'nanoid'

let jobs = [
	{ id: nanoid(), company: 'google', position: 'front' },
	{ id: nanoid(), company: 'microsoft', position: 'backend' },
]

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
app.get('/api/v1/jobs', (req: Request, res: Response) => {
	res.status(200).json({ jobs })
})

// GET SINGLE JOB
app.get('/api/v1/jobs/:id', (req: Request, res: Response) => {
	const { id } = req.params

	const job = jobs.find(job => (job.id = id))
	if (!job) {
		return res.status(404).json({ msg: 'no job find' })
	}
	res.status(200).json({ job })
})

// CREATE JOB
app.post('/api/v1/jobs', (req: Request, res: Response) => {
	const { company, position } = req.body

	if (!company || !position) {
		return res.status(400).json({ msg: 'please provide company and position' })
	}

	const id = nanoid(10)
	const job = { id, company, position }
	jobs.push(job)

	res.status(201).json({ job })
})

// EDIT JOB
app.patch('/api/v1/jobs/:id', (req: Request, res: Response) => {
	const { company, position } = req.body

	if (!company || !position) {
		return res.status(400).json({ msg: 'please provide company and position' })
	}

	const { id } = req.params

	const job = jobs.find(job => (job.id = id))
	if (!job) {
		return res.status(404).json({ msg: 'no job find' })
	}

	job.company = company
	job.position = position

	res.status(200).json({ msg: 'job modified', job })
})

// DELETE JOB
app.delete('/api/v1/jobs/:id', (req: Request, res: Response) => {
	const { id } = req.params

	const job = jobs.find(job => (job.id = id))
	if (!job) {
		return res.status(404).json({ msg: 'no job find' })
	}

	const newJobs = jobs.filter(job => job.id !== id)

	jobs = newJobs

	res.status(200).json({ msg: 'job deleted' })
})

const port = process.env.PORT || 5000

app.listen(port, () => {
	console.log(`server running on port ${port}`)
})
