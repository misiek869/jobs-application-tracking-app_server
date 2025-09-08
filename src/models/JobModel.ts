import mongoose, { Schema, Document, Model, Types } from 'mongoose'
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js'

export interface IJob extends Document {
	company: string
	position: string
	jobStatus: 'interview' | 'declined' | 'pending'
	jobType: 'full-time' | 'part-time' | 'internship'
	jobLocation: string
	createdAt: Date
	updatedAt: Date
	createdBy: Types.ObjectId
}

const JobSchema: Schema<IJob> = new Schema(
	{
		company: { type: String, required: true },
		position: { type: String, required: true },
		jobStatus: {
			type: String,
			enum: Object.values(JOB_STATUS) as IJob['jobStatus'][],
			default: JOB_STATUS.PENDING,
		},
		jobType: {
			type: String,
			enum: Object.values(JOB_TYPE) as IJob['jobType'][],
			default: JOB_TYPE.FULL_TIME,
		},
		jobLocation: {
			type: String,
			default: 'city',
		},
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timestamps: true }
)

const Job: Model<IJob> = mongoose.model<IJob>('Job', JobSchema)

export default Job
