import jwt, { Secret, SignOptions } from 'jsonwebtoken'

export const createJWT = (
	payload: object,
	secret: Secret = process.env.JWT_SECRET as Secret,
	expiresIn: SignOptions['expiresIn'] = (process.env
		.JWT_EXPIRES_IN as SignOptions['expiresIn']) || '1d'
): string => {
	if (!secret) throw new Error('JWT_SECRET is not defined')
	return jwt.sign(payload, secret, { expiresIn })
}

export const verifyJWT = (token: string) => {
	if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not defined')
	return jwt.verify(token, process.env.JWT_SECRET as Secret)
}
