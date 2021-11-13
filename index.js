// Imports
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')

// Connecting App to Express
const app = express()

// DotEnv config
dotenv.config()

// MongoDB connection config
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Connected to MongoDB')
  }
)

// Middleware config
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))

//Running our App
app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)

// Express listener
app.listen(8800, () => {
  console.log('Backend server is running!')
})
