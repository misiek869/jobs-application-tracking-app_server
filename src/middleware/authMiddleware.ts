import { Request, Response, NextFunction } from 'express'
import { UnauthenticatedError } from '../errors/customError.js'

export const authenticateUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { token } = req.cookies

	if (!token) throw new UnauthenticatedError('authentication problem')
	next()
}
