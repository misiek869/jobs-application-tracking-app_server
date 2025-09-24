import { readFile } from 'fs/promises'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from './models/UserModel.js'
import Job from './models/JobModel.js'
import { IJob } from './models/JobModel.js'

dotenv.config()

try {
	await mongoose.connect(process.env.MONGO_URL as string)

	const user = await User.findOne({ email: 'test@test.com' })

	const mockJobs = JSON.parse(
		await readFile(new URL('./utils/mockData.json', import.meta.url), 'utf-8')
	)

	const jobs = mockJobs.map((job: IJob) => ({
		...job,
		createdBy: user?._id,
	}))

	await Job.deleteMany({ createdBy: user?._id })
	await Job.create(jobs)

	console.log('success')
	process.exit(0)
} catch (error) {
	console.log(error)
	process.exit(1)
}
