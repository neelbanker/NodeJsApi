import express from 'express'
import quesController from '../controller/question'
import admin from '../../middleware/admin'
const router = express.Router()

router.get('/',quesController.getQuestion)
router.post('/create',admin.isAdmin, quesController.createQuestion)

module.exports = router