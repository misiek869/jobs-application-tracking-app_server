import { Request, Response, NextFunction } from 'express'
import User from '../models/UserModel.js'
import Job from '../models/JobModel.js'
import { StatusCodes } from 'http-status-codes'

export const getCurrentUser = async (req: Request, res: Response) => {
	const user = await User.findOne({ _id: req.user?.userId }).select('-password')

	res.status(StatusCodes.OK).json({ user: user })
}

export const getApplicationStats = async (req: Request, res: Response) => {
	const users = await User.countDocuments()
	const jobs = await Job.countDocuments()

	res.status(StatusCodes.OK).json({ users, jobs })
}

export const updateUser = async (req: Request, res: Response) => {
	console.log(req.file)

	const updatedUser = await User.findByIdAndUpdate(
		req.user?.userId,
		req.body
	).select('-password')

	res.status(StatusCodes.OK).json({ msg: 'update user' })
}
