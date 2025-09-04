import { nanoid } from 'nanoid'
import express, { Request, Response, NextFunction } from 'express'
import Job from '../models/JobModel.js'

let jobs = [
	{ id: nanoid(), company: 'google', position: 'front' },
	{ id: nanoid(), company: 'microsoft', position: 'backend' },
]

// GET ALL JOBS
export const getAllJobs = async (req: Request, res: Response) => {
	const jobs = await Job.find({})
	res.status(200).json({ jobs })
}

// GET SINGLE JOB
export const getSingleJob = async (req: Request, res: Response) => {
	const { id } = req.params
	const job = await Job.findById(id)
	if (!job) {
		return res.status(404).json({ msg: 'no job find' })
	}
	res.status(200).json({ job })
}

// CREATE JOB
export const createJob = async (req: Request, res: Response) => {
	const job = await Job.create(req.body)
	res.status(201).json({ job })
}

// EDIT JOB
export const editJob = async (req: Request, res: Response) => {
	const { id } = req.params

	const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
		new: true,
		// runValidators: true,
	})

	if (!updatedJob) {
		return res.status(404).json({ msg: 'no job find' })
	}

	res.status(200).json({ msg: 'job modified', job: updatedJob })
}

// DELETE JOB
export const deleteJob = async (req: Request, res: Response) => {
	const { id } = req.params

	const deletedJob = await Job.findByIdAndDelete(id)

	if (!deletedJob) {
		return res.status(404).json({ msg: 'no job find' })
	}

	res.status(200).json({ msg: 'job deleted' })
}
