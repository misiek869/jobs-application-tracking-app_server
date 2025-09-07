import express, { Request, Response, NextFunction } from 'express'
import Job from '../models/JobModel.js'
import { StatusCodes } from 'http-status-codes'
import { NotFoundError } from '../errors/customError.js'

export const register = async (req: Request, res: Response) => {
	res.send('register')
}
export const login = async (req: Request, res: Response) => {
	res.send('login')
}
