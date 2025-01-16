import express from 'express'
import {
  CreateNewGuide,
  GetAllGuides,
  GetOneGuide,
  UpdateGuide,
  DeleteGuide
} from '../controllers/guides.js'
import isExisted from '../middlewares/isExisted.js'
import IsAdmin from '../middlewares/IsAdmin.js'

const router = express.Router()

router.post('/create', isExisted, IsAdmin, CreateNewGuide)
router.get('/', GetAllGuides)
router.get('/:id', GetOneGuide)
router.put('/:id', isExisted, IsAdmin, UpdateGuide)
router.delete('/:id', isExisted, IsAdmin, DeleteGuide)

export default router
