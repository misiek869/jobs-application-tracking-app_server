import { Request, Response, NextFunction } from 'express'
import User from '../models/UserModel.js'
import Job from '../models/JobModel.js'
import { StatusCodes } from 'http-status-codes'

export const getCurrentUser = async (req: Request, res: Response) => {
	const user = await User.findOne({ _id: req.user?.userId }).select('-password')

	res.status(StatusCodes.OK).json({ user: user })
}

export const getApplicationStats = async (req: Request, res: Response) => {
	res.status(StatusCodes.OK).json({ msg: 'app stats' })
}

export const updateUser = async (req: Request, res: Response) => {
	const updatedUser = await User.findByIdAndUpdate(req.user?.userId, req.body)

	res.status(StatusCodes.OK).json({ msg: 'update user' })
}
