import mongoose from 'mongoose'

const AnswerSchema = new mongoose.Schema({
    question_id: String,
    answer: String,
    user_mail: String,
    correct: {
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('Answer', AnswerSchema)