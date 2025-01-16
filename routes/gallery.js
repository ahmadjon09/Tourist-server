import express from 'express'
import {
  allPhotos,
  createPhoto,
  deletePhoto,
  dislikePhoto,
  getOnePhoto,
  likePhoto
} from '../controllers/gallery.js'
import isExisted from '../middlewares/isExisted.js'

const router = express.Router()

router.post('/create', isExisted, createPhoto)
router.get('/', allPhotos)
router.put('/:id/like', isExisted, likePhoto)
router.put('/:id/dislike', isExisted, dislikePhoto)
router.delete('/:id', isExisted, deletePhoto)
router.get('/:id', getOnePhoto)

export default router
