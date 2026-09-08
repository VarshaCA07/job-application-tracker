const express = require('express')
const router = express.Router()
const Job = require('../models/Job')
const authMiddleware = require('../middleware/auth')

router.use(authMiddleware)

// GET all jobs for the logged-in user
router.get('/', async (req, res) => {
  const jobs = await Job.find({ user: req.userId }).sort({ createdAt: -1 })
  res.json(jobs)
})

// POST a new job, linked to the logged-in user
router.post('/', async (req, res) => {
  const { company, role } = req.body
  const newJob = new Job({ company, role, user: req.userId })
  const savedJob = await newJob.save()
  res.status(201).json(savedJob)
})

// PUT update a job's status (only if it belongs to this user)
router.put('/:id', async (req, res) => {
  const { status } = req.body
  const updatedJob = await Job.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    { status },
    { new: true }
  )
  if (!updatedJob) return res.status(404).json({ message: 'Job not found' })
  res.json(updatedJob)
})

// DELETE a job (only if it belongs to this user)
router.delete('/:id', async (req, res) => {
  const deletedJob = await Job.findOneAndDelete({ _id: req.params.id, user: req.userId })
  if (!deletedJob) return res.status(404).json({ message: 'Job not found' })
  res.json({ message: 'Job deleted' })
})

module.exports = router