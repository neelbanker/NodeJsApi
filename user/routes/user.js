import express from 'express'
import userController from '../controller/user'


const router = express.Router()

router.get('/',userController.getUsers)
router.get('/:id', userController.getUser)
router.post('/register',userController.createUser)
router.put('/:id',userController.updateUser)
router.delete('/:id',userController.deleteUser)
router.get('/auth/:token', userController.authUser)
router.post('/login', userController.userLogin)

module.exports = router