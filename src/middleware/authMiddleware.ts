import { Request, Response, NextFunction } from 'express'
import {
	UnauthenticatedError,
	UnauthorizedError,
} from '../errors/customError.js'
import { verifyJWT } from '../utils/tokenUtils.js'
import { JwtPayload } from 'jsonwebtoken'

interface TokenPayload extends JwtPayload {
	userId: string
	role: string
}

export const authenticateUser = (
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

export const authorizePermissions = (...role: string[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
		if (!req.user || !role.includes(req.user.role)) {
			throw new UnauthorizedError('only admin can see this route')
		}
		next()
	}
}
