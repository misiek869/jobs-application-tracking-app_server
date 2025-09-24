import { Request, Response, NextFunction } from 'express'
import {
	UnauthenticatedError,
	UnauthorizedError,
	BadRequestError,
} from '../errors/customError.js'
import { verifyJWT } from '../utils/tokenUtils.js'
import { JwtPayload } from 'jsonwebtoken'

interface TokenPayload extends JwtPayload {
	userId: string
	role: string
	testUser: boolean
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
		const testUser = userId === '68d36ed64207e431da5a05f1'
		req.user = { userId, role, testUser }

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

export const checkForTestUSer = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.user?.testUser) throw new BadRequestError('Test User. Read Only.')
	next()
}
