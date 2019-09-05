import userService from '../services/user'
import responseGenerator from '../../middleware/sendResponse'

module.exports = {
    getUsers: async (req,res) => {
        try{
            const users = await userService.findall(req,res)
            responseGenerator.sendResponse(res, 200, users)
        }catch (exception){
            throw Error(exception)
        }
    },
    getUser: async (req,res) => {
        try{
            const users = await userService.find(req,res)
            responseGenerator.sendResponse(res, 200, users)
        }catch (exception){
            throw Error(exception)
        }
    },
    createUser: async (req,res) => {
        try{
            const token =await userService.create(req,res)
            const mail =await userService.sendMail(req,res,token)
            responseGenerator.sendResponse(res, 200, mail)
            
        }catch (exception){
            throw Error(exception)
        }
    },
    updateUser: async (req,res) => {
        try{
            const user = await userService.update(req,res)
            responseGenerator.sendResponse(res, 200, user)
        }catch (exception){
            throw Error(exception)
        }
    },
    deleteUser: async (req,res) => {
        try{
            const user = await userService.delete(req,res)
            responseGenerator.sendResponse(res, 200, user)
        }catch (exception){
            throw Error(exception)
        }
    },
    authUser:  async (req, res) => {
        try{
            const users = await userService.confirmed(req,res)
            responseGenerator.sendResponse(res, 200, users)
        }catch (exception){
            throw Error(exception)
        }
    },
    userLogin: async (req, res) => {
        try{
            console.log('.............',req.session)
            const users = await userService.login(req,res)
            console.log(req.session)
            req.session.save()
            return responseGenerator.sendResponse(res, 200, users)
        }catch (exception){
            throw Error(exception)
        }
    }

}