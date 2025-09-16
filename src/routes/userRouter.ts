import { Router } from 'express'
import {
	getApplicationStats,
	getCurrentUser,
	updateUser,
} from '../controllers/userController.js'
import { validateUpdateUser } from '../middleware/validationMIddleware.js'

const router = Router()

router.get('/current-user', getCurrentUser)
router.get('/admin/stats', getApplicationStats)
router.patch('/update-user', validateUpdateUser, updateUser)

export default router
