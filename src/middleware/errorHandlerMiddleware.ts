import { ErrorRequestHandler } from 'express'

import { StatusCodes } from 'http-status-codes'

const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
	console.error(err.stack || err)

	const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR

	const message = err.message || 'something went wrong, try again later'

	res.status(statusCode).json({ message })
}

export default errorHandlerMiddleware
