import answerSchema from '../models/answer'
import questionSchema from '../../question/models/question'
import userSchema from '../../user/models/user'

module.exports = {
    create: async (req,res) =>{
        try{
            const answers = await answerSchema.create({
                question_id: req.body.question_id,
                answer: req.body.answer,
                user_mail: req.body.email,
            })
            return answers

        }catch (exception){
            throw Error(exception)
        }
    },
    find: async (req,res) =>{
        try{
            const questions = await questionSchema.findOne(
                {
                    _id:req.body.question_id
                })
            return questions

        }catch (exception){
            throw Error(exception)
        }
    },
    update: async (req,res) =>{
        try{
            const answer = await answerSchema.updateOne({question_id:req.body.question_id}, {$set:{correct:true}});
            const user = await userSchema.findOne({email:req.body.email});
            const updated_score = user.score += 1;
            const score = await userSchema.updateOne({email:req.body.email}, {$set:{score:updated_score}});
            console.log(updated_score)
            return score
        }catch (exception){
            throw Error(exception)
        }
    }
}