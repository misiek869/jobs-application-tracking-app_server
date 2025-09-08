import jwt, { Secret, SignOptions } from 'jsonwebtoken'

export const createJWT = (
	payload: object,
	secret: Secret = process.env.JWT_SECRET || 'secret',
	options: SignOptions = { expiresIn: '1d' }
): string => {
	return jwt.sign(payload, secret, options)
}
