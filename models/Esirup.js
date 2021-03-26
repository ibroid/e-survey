const mongoose = require('mongoose')

const QuesSchema = new mongoose.Schema({
  pertanyaan : String,
  nomor : Number 
})

const ResSchema = new mongoose.Schema({
  nomor : Number,
  jawaban : String,
  nilai : Number,
})

module.exports = {
  question : mongoose.model('ques_esirup', QuesSchema),
  answer : mongoose.model('ans_esirup', ResSchema)
} 