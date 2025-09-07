import { Request, Response, NextFunction } from 'express'
import User from '../models/UserModel.js'
import { StatusCodes } from 'http-status-codes'
import { hashPassword } from '../utils/passwordUtils.js'

export const register = async (req: Request, res: Response) => {
	const isFirstUser = (await User.countDocuments()) === 0
	req.body.role = isFirstUser ? 'admin' : 'user'

	req.body.password = await hashPassword(req.body.password)

	const user = await User.create(req.body)
	res.status(StatusCodes.CREATED).json({ msg: 'user created' })
}
export const login = async (req: Request, res: Response) => {
	res.send('login')
}
