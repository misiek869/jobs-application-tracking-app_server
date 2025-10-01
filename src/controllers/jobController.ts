import express, { Request, Response, NextFunction } from 'express'
import Job from '../models/JobModel.js'
import { StatusCodes } from 'http-status-codes'
import { NotFoundError } from '../errors/customError.js'
import mongoose from 'mongoose'
import dayjs from 'dayjs'

const day = dayjs

type JobQuery = {
	createdBy: string | undefined
	$or?: { position?: object; company?: object }[]
	jobStatus?: string
	jobType?: string
}
// GET ALL JOBS
export const getAllJobs = async (req: Request, res: Response) => {
	const { search, jobStatus, jobType, sort } = req.query

	const queryObject: JobQuery = {
		createdBy: req.user?.userId,
	}

	if (typeof search === 'string' && search.trim() !== '') {
		queryObject.$or = [
			{ position: { $regex: search, $options: 'i' } },
			{ company: { $regex: search, $options: 'i' } },
		]
	}

	if (typeof jobStatus === 'string' && jobStatus !== 'all') {
		queryObject.jobStatus = jobStatus
	}

	if (typeof jobType === 'string' && jobType !== 'all') {
		queryObject.jobType = jobType
	}

	const sortOptions: Record<string, string> = {
		newest: '-createdAt',
		oldest: 'createdAt',
		'a-z': 'position',
		'z-a': '-position',
	}

	let sortKey = sortOptions.newest

	if (typeof sort === 'string' && sortOptions[sort]) {
		sortKey = sortOptions[sort]
	}

	const jobs = await Job.find(queryObject).sort(sortKey).limit(1)

	const totalJobs = await Job.countDocuments(queryObject)

	res.status(StatusCodes.OK).json({ totalJobs, jobs })
}

// GET SINGLE JOB
export const getSingleJob = async (req: Request, res: Response) => {
	const { id } = req.params
	const job = await Job.findById(id)

	res.status(StatusCodes.OK).json({ job })
}

// CREATE JOB
export const createJob = async (req: Request, res: Response) => {
	req.body.createdBy = req.user?.userId
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

	res.status(StatusCodes.OK).json({ msg: 'job modified', job: updatedJob })
}

// DELETE JOB
export const deleteJob = async (req: Request, res: Response) => {
	const { id } = req.params

	const deletedJob = await Job.findByIdAndDelete(id)

	res.status(200).json({ msg: 'job deleted' })
}

export const showStats = async (req: Request, res: Response) => {
	let aggregationResult: { _id: string; count: number }[] = await Job.aggregate(
		[
			{ $match: { createdBy: new mongoose.Types.ObjectId(req.user?.userId) } },
			{ $group: { _id: '$jobStatus', count: { $sum: 1 } } },
		]
	)

	let stats = aggregationResult.reduce<Record<string, number>>((acc, curr) => {
		const { _id: title, count } = curr
		acc[title] = count
		return acc
	}, {})

	const defaultData = {
		pending: stats.pending || 0,
		interview: stats.interview || 0,
		declined: stats.declined || 0,
	}

	let monthlyApplications = await Job.aggregate([
		{ $match: { createdBy: new mongoose.Types.ObjectId(req.user?.userId) } },
		{
			$group: {
				_id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
				count: { $sum: 1 },
			},
		},
		{ $sort: { '_id.year': -1, '_id.month': -1 } },
		{ $limit: 6 },
	])

	monthlyApplications = monthlyApplications
		.map((item, index) => {
			const {
				_id: { year, month },
				count,
			} = item

			const date = day()
				.month(month - 1)
				.year(year)
				.format('MMM YY')

			return { date, count }
		})
		.reverse()

	res.status(StatusCodes.OK).json({ defaultData, monthlyApplications })
}
