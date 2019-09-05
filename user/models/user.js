import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true
    },
    password_dec: {
        type: String,
        required: true
    },
    admin: Boolean,
    confirmed: {
        type: Boolean,
        default: false
    },
    score:{
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('user', userSchema)