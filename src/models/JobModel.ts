import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IJob extends Document {
	company: string
	position: string
	jobStatus: 'interview' | 'declined' | 'pending'
	jobType: 'full-time' | 'part-time' | 'internship'
	jobLocation: string
	createdAt: Date
	updatedAt: Date
}

const JobSchema: Schema<IJob> = new Schema(
	{
		company: { type: String, required: true },
		position: { type: String, required: true },
		jobStatus: {
			type: String,
			enum: ['interview', 'declined', 'pending'],
			default: 'pending',
		},
		jobType: {
			type: String,
			enum: ['full-time', 'part-time', 'internship'],
			default: 'full-time',
		},
		jobLocation: {
			type: String,
			default: 'city',
		},
	},
	{ timestamps: true }
)

const Job: Model<IJob> = mongoose.model<IJob>('Job', JobSchema)

export default Job
