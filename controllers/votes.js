const voteRouter = require('express').Router()
const Vote = require('../models/vote')
const Website = require('../models/website')

voteRouter.get('/', async (req, res) => {
  const votes = await Vote.find({})
  res.json(votes)
})

voteRouter.post('/', async (req, res) => {    
  const { verificationToken, email, ...rest } = req.body

  const existingVote = await Vote.findOne({ email })
  if (existingVote) {
    return res.status(400).json({ error: 'Email already exists' })
  }

  if (rest.votes.length < 1 || rest.votes.length > 3) {
    return res.status(400).json({ error: 'Invalid number of votes' })
  }

  const websiteIds = rest.votes
  const websites = await Website.find({ _id: { $in: websiteIds } })

  if (websites.length !== websiteIds.length) {
    return res.status(400).json({ error: 'One or more website IDs are invalid' })
  }

  const uniqueVotes = [...new Set(rest.votes)]
  if (uniqueVotes.length !== rest.votes.length) {
    return res.status(400).json({ error: 'Duplicate votes are not allowed' })
  }

  const vote = new Vote({ email, ...rest })
  console.log(vote)
  const savedVote = await vote.save()
  res.status(201).json(savedVote)
})

module.exports = voteRouter