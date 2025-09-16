import {
	body,
	param,
	validationResult,
	ValidationChain,
} from 'express-validator'
import {
	BadRequestError,
	NotFoundError,
	UnauthorizedError,
} from '../errors/customError.js'
import { Request, Response, NextFunction } from 'express'
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js'
import mongoose from 'mongoose'
import Job from '../models/JobModel.js'
import User from '../models/UserModel.js'
import { Types } from 'mongoose'

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
				if (errorMessages[0].startsWith('not authorized')) {
					throw new UnauthorizedError('not authorized to access this route')
				}
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
	param('id').custom(async (value, meta) => {
		const idValidId = mongoose.Types.ObjectId.isValid(value)

		if (!idValidId) throw new BadRequestError('invalid MongoDb id')

		const job = await Job.findById(value)

		if (!job) throw new NotFoundError(`Can't find this job`)

		const isAdmin = meta.req.user.role === 'admin'
		const isOwner = meta.req.user.userId === job.createdBy.toString()

		if (!isAdmin && !isOwner)
			throw new UnauthorizedError('not authorized to access this route')
	}),
])

export const validateRegister = withValidationErrors([
	body('name').notEmpty().withMessage('name is required'),
	body('email')
		.notEmpty()
		.withMessage('email is required')
		.isEmail()
		.withMessage('invalid email format')
		.custom(async email => {
			const user = await User.findOne({ email })

			if (user) throw new BadRequestError('email already exists')
		}),
	body('password')
		.notEmpty()
		.withMessage('password is required')
		.isLength({ min: 8 })
		.withMessage('password must be at least 8 characters'),
	body('lastName').notEmpty().withMessage('lastName is required'),
	body('location').notEmpty().withMessage('location is required'),
])

export const validateLogin = withValidationErrors([
	body('email')
		.notEmpty()
		.withMessage('email is required')
		.isEmail()
		.withMessage('invalid email format'),
	body('password').notEmpty().withMessage('password is required'),
])

export const validateUpdateUser = withValidationErrors([
	body('name').notEmpty().withMessage('name is required'),
	body('email')
		.notEmpty()
		.withMessage('email is required')
		.isEmail()
		.withMessage('invalid email format')
		.custom(async (email, { req }) => {
			const user = await User.findOne({ email })

			if (user && (user._id as Types.ObjectId).toString() !== req.user.userId) {
				throw new BadRequestError('email already exists')
			}
		}),

	body('lastName').notEmpty().withMessage('lastName is required'),
	body('location').notEmpty().withMessage('location is required'),
])
