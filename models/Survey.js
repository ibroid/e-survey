const mongoose = require('mongoose')

const { Schema, model } = mongoose

const Map = new Schema({
  responden: String,
  questioner: String,
  answer: Array,
  saran: String,
  created: {
    type: Date,
    default: Date.now()
  }
})

module.exports = model('survey', Map)