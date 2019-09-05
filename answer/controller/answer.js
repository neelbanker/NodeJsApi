import ansService from '../services/answer'
import responseGenerator from '../../middleware/sendResponse'

module.exports = {
    getAnswer: async (req,res) => {
        try{
            const answers = await ansService.create(req, res)
            const questions = await ansService.find(req, res)
            if (answers.answer === questions.answer){
                const score = ansService.update(req, res)
                return responseGenerator.sendResponse(res, 200, 'Correct answer' + score)

            }else {
                return responseGenerator.sendResponse(res, 400, 'InCorrect answer')
            }

        }catch (exception){
            throw Error(exception)
        }
    }
}