import express, { Request, Response, NextFunction, Router } from 'express'

const router = Router()

import {
	getAllJobs,
	getSingleJob,
	createJob,
	editJob,
	deleteJob,
} from '../controllers/jobController.js'

router.get('/', getAllJobs)
router.post('/', createJob)
router.get('/:id', getSingleJob)
router.patch('/:id', editJob)
router.delete('/:id', deleteJob)

export default router
