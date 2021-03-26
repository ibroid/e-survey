const mongoose = require('mongoose')

const Map  = new mongoose.Schema({
  nama: String,
  umur: Number,
  jenis_kelamin: String,
  asal: String,
  created: {
    type : Date,
    default : Date.now()
  }
})


const Model = mongoose.model('responden', Map)
module.exports = Model;