import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
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

app.get('/', (req, res) => {
	res.send('hello world')
})

app.post('/', (req, res) => {
	res.json({ message: 'data received', data: req.body })
})

app.get('/api/v1/jobs', (req, res) => {
	res.status(200).json({ jobs })
})

const port = process.env.PORT || 5000

app.listen(port, () => {
	console.log(`server running on port ${port}`)
})
