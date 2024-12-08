const mongoose = require('mongoose')
const Website = require('./website') // Assuming the website model is in the same directory

const voteSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, validate: {
    validator: v => {
      return /^[\w\.]+@student.nhlstenden.com$/.test(v)
    }
  } },
  votes: [{
    type: String,
    validate: {
      validator: v => {
        const website = Website.findById(v)
        return website !== null
      }
    }
  }],
  verificationToken: {
    type: String,
    default: () => Math.random().toString(36).substr(2, 9),
    unique: true
  }
})

voteSchema.minlength = 1
voteSchema.maxlength = 3

voteSchema.set('toJSON', { transform: (document, returnedObject) => {
  returnedObject.id = returnedObject._id.toString()
  delete returnedObject._id
  delete returnedObject.__v
  delete returnedObject.verificationToken
} })

const Vote = mongoose.model('Vote', voteSchema)

module.exports = Vote
