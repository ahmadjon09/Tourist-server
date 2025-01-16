import express from 'express'
import {
  createPost,
  AllPosts,
  likePost,
  dislikePost,
  DeletePost
} from '../controllers/posts.js'
import isExisted from '../middlewares/isExisted.js'

const router = express.Router()

router.post('/create', isExisted, createPost)
router.get('/all', AllPosts)
router.put('/:id/like', isExisted, likePost)
router.put('/:id/dislike', isExisted, dislikePost)
router.delete('/:id', isExisted, DeletePost)

export default router
