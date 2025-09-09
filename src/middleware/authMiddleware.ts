import { Request, Response, NextFunction } from 'express'
import { UnauthenticatedError } from '../errors/customError.js'
import { verifyJWT } from '../utils/tokenUtils.js'
import { JwtPayload } from 'jsonwebtoken'

interface TokenPayload extends JwtPayload {
	userId: string
	role: string
}

export const authenticateUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { token } = req.cookies

	if (!token) throw new UnauthenticatedError('authentication problem')

	try {
		const { userId, role } = verifyJWT(token) as TokenPayload

		req.user = { userId, role }

		next()
	} catch (error) {
		throw new UnauthenticatedError('authentication problem')
	}
}
