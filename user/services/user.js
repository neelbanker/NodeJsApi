import userSchema from '../models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import responseGenerator from '../../middleware/sendResponse'

module.exports ={
    findall: async (req,res) => {
        try{
            const users = await userSchema.find({})
            return users
        }catch (exception){
            throw Error(exception)
        }
    },
    find: async (req,res) => {
        try{
            const user = await userSchema.find({_id: req.params.id})
            return user
        }catch (exception){
            throw Error(exception)
        }
    },
    create: async (req,res) => {
        try{
            const password = req.body.password
            const salt = await bcrypt.genSalt(10)
            const password_dec = await bcrypt.hashSync(password, salt)

            const user = await userSchema.create({
                name: req.body.name,
                email: req.body.email,
                password_dec: password_dec,
                admin: req.body.admin
            })
            const token = await jwt.sign(user.toJSON(), 'secretkey');
            return token
            
        }catch (exception){
            throw Error(exception)
        }
    },
    sendMail: async (req, res, token) => {
        try{
            let testaccount = nodemailer.createTestAccount();
    
            const transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'tomasa.grimes84@ethereal.email',
                    pass: 'NaNRaEK9tNeZweMVu4'
                }
            })
            const url = `localhost:3000/api/user/auth/${token}`;

            const info = await transporter.sendMail({
                from:'ahthakkar',
                to: req.body.email,
                subject: 'confirmation mail',
                html: `please click the below link : <a href="${url}">${url}</a>`
            })
            console.log('mail sent')
            return nodemailer.getTestMessageUrl(info)
        }catch (exception){
            throw Error(exception)
        }
    },
    confirmed: async (req,res) => {
        try{
            const decoded = jwt.verify(req.params.token, 'secretkey')
            req.user = decoded
            const users = await userSchema.updateOne({email:req.user.email}, {$set: {confirmed: true}})
            return users
        }catch (exception){
            throw Error(exception)
        }
    },
    update: async (req,res) => {
        try{
            const user = await userSchema.updateOne({_id:req.params.id},{$set:req.body})
            return user
        }catch (exception){
            throw Error(exception)
        }
    },
    delete: async(req,res) => {
        try{
            const user = await userSchema.deleteOne({_id: req.params.id})
            return user
        }catch (exception){
            throw Error(exception)
        }
    },
    login: async (req,res) => {
        try{
            const user = await userSchema.findOne({email: req.body.email})
            if (!user) return responseGenerator.sendResponse(res, 400, 'invalid email address')
            if (user.confirmed === true){
                const found_password = await bcrypt.compare(req.body.password, user.password_dec)
                if (!found_password) return responseGenerator.sendResponse(res, 400, 'invalid password')
                req.session.userId = user.email
                req.session.save()
                return  req.session
            }else{
                return responseGenerator.sendResponse(res, 400,'please confirm your email address')
            }
        }catch(exception){
            throw Error(exception)
        }
    }

}