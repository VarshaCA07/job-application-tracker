const express = require('express')
const router = express.Router()
const Job = require('../models/Job')

// GET all jobs
router.get('/', async (req, res) => {
  const jobs = await Job.find().sort({ createdAt: -1 })
  res.json(jobs)
})

// POST a new job
router.post('/', async (req, res) => {
  const { company, role } = req.body
  const newJob = new Job({ company, role })
  const savedJob = await newJob.save()
  res.status(201).json(savedJob)
})

// PUT update a job's status
router.put('/:id', async (req, res) => {
  const { status } = req.body
  const updatedJob = await Job.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  )
  res.json(updatedJob)
})

// DELETE a job
router.delete('/:id', async (req, res) => {
  await Job.findByIdAndDelete(req.params.id)
  res.json({ message: 'Job deleted' })
})

module.exports = router