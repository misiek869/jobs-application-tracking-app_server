import jwt, { Secret, SignOptions } from 'jsonwebtoken'

export const createJWT = (
	payload: object,
	secret: Secret = process.env.JWT_SECRET as Secret,
	expiresIn: SignOptions['expiresIn'] = (process.env
		.JWT_EXPIRES_IN as SignOptions['expiresIn']) || '1d'
): string => {
	return jwt.sign(payload, secret, { expiresIn })
}
