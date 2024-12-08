const express = require('express')
const app = express()
const cors = require('cors')
const websiteRouter = require('./controllers/websites')
const voteRouter = require('./controllers/votes')
const departuresRouter = require('./controllers/departures')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
require('dotenv').config()

// mongoose.set('strictQuery', false)

// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => {
//     logger.info('Connected to MongoDB')
//   })
//   .catch((error) => {
//     logger.error('Error connecting to MongoDB:', error.message)
//   })


app.use(cors({
  origin: '*'
}))

app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

// app.use('/api/websites', websiteRouter)
// app.use('/api/votes', voteRouter)
app.use(`/api/departures`, departuresRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app