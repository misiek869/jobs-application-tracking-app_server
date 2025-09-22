import { Router } from 'express'
import {
	getApplicationStats,
	getCurrentUser,
	updateUser,
} from '../controllers/userController.js'
import { validateUpdateUser } from '../middleware/validationMIddleware.js'
import { authorizePermissions } from '../middleware/authMiddleware.js'
import upload from '../middleware/multerMiddleware.js'

const router = Router()

router.get('/current-user', getCurrentUser)
router.get('/admin/stats', authorizePermissions('admin'), getApplicationStats)
router.patch(
	'/update-user',
	upload.single('avatar'),
	validateUpdateUser,
	updateUser
)

export default router
