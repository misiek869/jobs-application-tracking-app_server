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
import { checkForTestUSer } from '../middleware/authMiddleware.js'

router.get('/', getAllJobs)
router.post('/', checkForTestUSer, validateJobInput, createJob)
router.get('/:id', validateIdParam, getSingleJob)
router.patch('/:id', checkForTestUSer, validateJobInput, editJob)
router.delete(
	'/:id',
	checkForTestUSer,
	validateIdParam,
	validateIdParam,
	deleteJob
)

export default router
