import express from 'express'
import {
  CreateNewService,
  GetAllServices,
  UpdateService,
  DeleteService,
  GetOneService
} from '../controllers/service.js'
import IsAdmin from '../middlewares/IsAdmin.js'
import isExisted from '../middlewares/isExisted.js'

const router = express.Router()

router.post('/create', isExisted, IsAdmin, CreateNewService)
router.get('/', GetAllServices)
router.get('/:id', GetOneService)
router.put('/:id', isExisted, IsAdmin, UpdateService)
router.delete('/:id', isExisted, IsAdmin, DeleteService)

export default router
