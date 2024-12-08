const mongoose = require('mongoose')

const websiteSchema = new mongoose.Schema({
  name: String,
  url: String,
  description: String,
  email: { type: String, required: true, unique: true, validate: {
    validator: v => {
      return /^[\w\.]+@student.nhlstenden.com$/.test(v)
    }
  } },
  votes: Number
})

websiteSchema.set('toJSON', { transform: (document, returnedObject) => {
  returnedObject.id = returnedObject._id.toString()
  delete returnedObject._id
  delete returnedObject.__v
} })

const Website = mongoose.model('Website', websiteSchema)

module.exports = Website