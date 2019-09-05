import queService from '../services/question'
import responseGenerator from '../../middleware/sendResponse'

module.exports = {
    getQuestion: async (req,res) => {
        try{
            const questions = await queService.find(req,res)
            responseGenerator.sendResponse(res, 200, questions)
        }catch (exception){
            throw Error(exception)
        }
    },
    createQuestion: async (req, res) => {
        try{
            const question = await queService.create(req, res)
            console.log(question)
            responseGenerator.sendResponse(res, 200, question)            
        }catch (exception){
            throw Error(exception)
        }
    }
}