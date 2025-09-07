import { Router } from 'express'

const router = Router()

import { register, login } from '../controllers/authController.js'
import { validateRegister } from '../middleware/validationMIddleware.js'

router.post('/register', validateRegister, register)
router.post('/login', login)

export default router
