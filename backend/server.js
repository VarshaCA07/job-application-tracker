const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authRoutes = require('./routes/auth')
require('dotenv').config()
const jobRoutes = require('./routes/jobs')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/jobs', jobRoutes)
app.use('/api/auth', authRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err))

app.get('/', (req, res) => {
  res.send('Job Tracker API is running')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))