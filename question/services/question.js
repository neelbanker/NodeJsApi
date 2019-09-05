import queSchema from '../models/question'

module.exports = {
    create: async (req,res) => {
        const que = await queSchema.create({
            question: req.body.question,
            options: req.body.options,
            answer: req.body.answer
        })
        return que
        console.log(que)
    },
    find: async (req, res) => {
    const questions = await queSchema.find({})
    return questions
    } 
}