import {
	body,
	param,
	validationResult,
	ValidationChain,
} from 'express-validator'
import { BadRequestError, NotFoundError } from '../errors/customError.js'
import { Request, Response, NextFunction } from 'express'
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js'
import mongoose from 'mongoose'
import Job from '../models/JobModel.js'

const withValidationErrors = (
	validateValues: ValidationChain | ValidationChain[]
) => {
	return [
		...(Array.isArray(validateValues) ? validateValues : [validateValues]),
		(req: Request, res: Response, next: NextFunction) => {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				const errorMessages = errors.array().map(error => error.msg)
				// if (errorMessages[0].startsWith('no job')) {
				// 	throw new NotFoundError(errorMessages)
				// }
				throw new BadRequestError(errorMessages.join(', '))
			}
			next()
		},
	]
}

export const validateJobInput = withValidationErrors([
	body('company').notEmpty().withMessage('company is required'),
	body('position').notEmpty().withMessage('position is required'),
	body('jobLocation').notEmpty().withMessage('location is required'),
	body('jobStatus')
		.isIn(Object.values(JOB_STATUS))
		.withMessage('invalid status'),
	body('jobType').isIn(Object.values(JOB_TYPE)).withMessage('invalid job type'),
])

export const validateIdParam = withValidationErrors([
	param('id').custom(async value => {
		const idValidId = mongoose.Types.ObjectId.isValid(value)

		if (!idValidId) throw new BadRequestError('invalid MongoDb id')

		const job = await Job.findById(value)

		if (!job) throw new NotFoundError(`Can't find this job`)
	}),
])
