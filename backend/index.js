require('dotenv').config()
require('express-async-errors')

//security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

const express = require('express')
const connectDB = require('./db/connect')
const app = express()
const authentication = require('./middlewares/Authentication')
const port = process.env.PORT || 5000
const notFound = require('./middlewares/not-found')
const errorHandlerMiddleware = require('./middlewares/error-handler')

///get routes
const authRouter = require('./routes/authentication')
const mediaRouter = require('./routes/Media')

//middlewares
app.set('trust proxy', 1)
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 50,
}))
app.use(express.json());
app.use(helmet())
app.use(cors(
    {
        origin: 'https://movies-series-explorer-fullstack.vercel.app'
    }
));
app.use(xss());

//routes
app.get('/', (req, res)=>{
    res.send('<h1>backend </h1>')
})
app.use('/api/authentication', authRouter)
app.use('/api/media', authentication, mediaRouter)
app.use(notFound)
app.use(errorHandlerMiddleware)

const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log(`server on ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()
