import express from 'express'
import { createPost, deletpost, editPost, getAllPosts, getPost } from '../controllers/postController.js'
import authMiddleWare from '../middleWare/authMiddleWare.js'

const router = express.Router()

router.post('/',authMiddleWare, createPost)
router.get('/:id',authMiddleWare,getPost)
router.put('/:id',authMiddleWare,editPost)
router.post('/:id',authMiddleWare,deletpost)
router.get('/:id/allPosts',authMiddleWare,getAllPosts)

export default router