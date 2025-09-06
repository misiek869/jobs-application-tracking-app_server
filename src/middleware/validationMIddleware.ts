import { body, validationResult } from 'express-validator'
import { BarRequestError } from '../errors/customError.js'
import { Request, Response, NextFunction } from 'express'

const withValidationErrors = (validateValues: string) => {
	return [
		validateValues,
		(req: Request, res: Response, next: NextFunction) => {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				const errorMessages = errors.array().map(error => {
					error.msg
				})

				throw new BarRequestError(errorMessages)
			}
			next()
		},
	]
}
