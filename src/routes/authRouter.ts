import { Router } from 'express'

const router = Router()

import { register, login } from '../controllers/authController.js'
import {
	validateRegister,
	validateLogin,
} from '../middleware/validationMIddleware.js'

router.post('/register', validateRegister, register)
router.post('/login', validateLogin, login)

export default router
