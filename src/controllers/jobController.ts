import { nanoid } from 'nanoid'
import express, { Request, Response, NextFunction } from 'express'
import Job from '../models/JobModel.js'

let jobs = [
	{ id: nanoid(), company: 'google', position: 'front' },
	{ id: nanoid(), company: 'microsoft', position: 'backend' },
]

// GET ALL JOBS
export const getAllJobs = async (req: Request, res: Response) => {
	res.status(200).json({ jobs })
}

// GET SINGLE JOB
export const getSingleJob = async (req: Request, res: Response) => {
	const { id } = req.params

	const job = jobs.find(job => (job.id = id))
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
}

// DELETE JOB
export const deleteJob = async (req: Request, res: Response) => {
	const { id } = req.params

	const job = jobs.find(job => (job.id = id))
	if (!job) {
		return res.status(404).json({ msg: 'no job find' })
	}

	const newJobs = jobs.filter(job => job.id !== id)

	jobs = newJobs

	res.status(200).json({ msg: 'job deleted' })
}
