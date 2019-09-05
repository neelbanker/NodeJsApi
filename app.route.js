import express from 'express'
import answer from './answer/routes/answer'
import question from './question/routes/question'
import user from './user/routes/user'
const router = express.Router()

router.use('/user', user)
router.use('/question', question)
router.use('/answer', answer)

module.exports = router