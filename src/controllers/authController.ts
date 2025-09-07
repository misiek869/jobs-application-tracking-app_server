import { Request, Response, NextFunction } from 'express'
import User from '../models/UserModel.js'
import { StatusCodes } from 'http-status-codes'

export const register = async (req: Request, res: Response) => {
	const isFirstUser = (await User.countDocuments()) === 0
	req.body.role = isFirstUser ? 'admin' : 'user'
	const user = await User.create(req.body)
	res.status(StatusCodes.CREATED).json({ user })
}
export const login = async (req: Request, res: Response) => {
	res.send('login')
}
