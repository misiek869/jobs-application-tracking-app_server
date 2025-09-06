import { Router } from 'express'

const router = Router()

import {
	getAllJobs,
	getSingleJob,
	createJob,
	editJob,
	deleteJob,
} from '../controllers/jobController.js'
import {
	validateJobInput,
	validateIdParam,
} from '../middleware/validationMIddleware.js'

router.get('/', getAllJobs)
router.post('/', validateJobInput, createJob)
router.get('/:id', validateIdParam, getSingleJob)
router.patch('/:id', validateJobInput, editJob)
router.delete('/:id', validateIdParam, validateIdParam, deleteJob)

export default router
