import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import api from './app.route'
import session from 'express-session'
import { userInfo } from 'os';
const MongoStore =  require('connect-mongo')(session);
const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(
    session({
        store: new MongoStore({
            url: 'mongodb://localhost/Es6quizapp',
            update: true
        }),
        name: 'uid',
        secret: 'secretkey',
        resave: true,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7, //7 days
        }
    })
)
app.use('/api', api)


mongoose.connect('mongodb://localhost/Es6quizapp', {useNewUrlParser: true})
    .then(() => console.log('connected to database successfully...!!!'))
    .catch(err => console.log('something went wrong....!!!!',err))

module.exports = app