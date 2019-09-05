import express from 'express'
import ansController from '../controller/answer'
const router = express.Router()


router.post('/', ansController.getAnswer)

module.exports = router