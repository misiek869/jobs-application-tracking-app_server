import { body, validationResult, ValidationChain } from 'express-validator'
import { BadRequestError } from '../errors/customError.js'
import { Request, Response, NextFunction } from 'express'

const withValidationErrors = (
	validateValues: ValidationChain | ValidationChain[]
) => {
	return [
		...(Array.isArray(validateValues) ? validateValues : [validateValues]),
		(req: Request, res: Response, next: NextFunction) => {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				const errorMessages = errors.array().map(error => error.msg)
				throw new BadRequestError(errorMessages.join(', '))
			}
			next()
		},
	]
}

export const validateTest = withValidationErrors([
	body('name')
		.notEmpty()
		.withMessage('name is required')
		.isLength({ min: 3 })
		.withMessage('name must be at least 3 characters')
		.trim(),
])
