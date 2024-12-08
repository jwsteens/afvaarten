const websiteRouter = require('express').Router()
const Website = require('../models/website')

websiteRouter.get('/', async (req, res) => {
  const websites = await Website.find({})
  res.json(websites)
})

websiteRouter.post('/', async (req, res) => {    
  const website = new Website(req.body)
  const savedWebsite = await website.save()
  res.status(201).json(savedWebsite)
})

module.exports = websiteRouter