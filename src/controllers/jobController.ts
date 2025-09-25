import express, { Request, Response, NextFunction } from 'express'
import Job from '../models/JobModel.js'
import { StatusCodes } from 'http-status-codes'
import { NotFoundError } from '../errors/customError.js'
import mongoose from 'mongoose'
import dayjs from 'dayjs'

const day = dayjs

// GET ALL JOBS
export const getAllJobs = async (req: Request, res: Response) => {
	const jobs = await Job.find({ createdBy: req.user?.userId })
	res.status(StatusCodes.OK).json({ jobs })
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
