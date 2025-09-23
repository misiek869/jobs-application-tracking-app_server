import { Request, Response, NextFunction } from 'express'
import User from '../models/UserModel.js'
import Job from '../models/JobModel.js'
import { StatusCodes } from 'http-status-codes'
import { v2 as cloudinary } from 'cloudinary'
import { promises as fs } from 'fs'

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
	const newUser = { ...req.body }

	if (req.file) {
		const response = await cloudinary.uploader.upload(req.file.path)

		await fs.unlink(req.file.path)

		newUser.avatar = response.secure_url
		newUser.avatarPublicId = response.public_id
	}

	const updatedUser = await User.findByIdAndUpdate(req.user?.userId, newUser, {
		new: true,
	}).select('-password')

	if (req.file && updatedUser?.avatarPublicId) {
		await cloudinary.uploader.destroy(updatedUser.avatarPublicId)
	}

	res.status(StatusCodes.OK).json({ msg: 'update user' })
}
