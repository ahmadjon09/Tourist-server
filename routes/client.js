import express from 'express'
import {
  ClientLogin,
  ClientRegister,
  DeleteClient,
  GetAllClients,
  GetMe,
  UpdateClient
} from '../controllers/client.js'
import isExisted from '../middlewares/isExisted.js'
import IsAdmin from '../middlewares/IsAdmin.js'

const router = express.Router()

router.get('/all', isExisted, IsAdmin, GetAllClients)
router.get('/me', isExisted, GetMe)
router.post('/register', ClientRegister)
router.post('/login', ClientLogin)
router.put('/:id', isExisted, UpdateClient)
router.delete('/:id', isExisted, DeleteClient)

export default router