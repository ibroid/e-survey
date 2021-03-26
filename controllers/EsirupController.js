const Model = require('../models/Esirup')
const Survey = require('../models/Survey')
class Esirup {
  constructor() {}
  async view(req, res) {
    const QuesNumber = (!req.session.esirup) ? 1 : 1 + parseInt(req.session.esirup[req.session.esirup.length - 1].number)
    const [data] = await Model.question.find({
      nomor: QuesNumber
    })
    if (!data) {
      res.render('saran', {
        csrfToken : req.csrfToken(),
        action : '/save_survey_esirup'
      })
    } else {
      res.render('esirup', {
        pertanyaan : data.pertanyaan,
        answers : await Model.answer.find({ nomor: data.nomor }),
        csrfToken : req.csrfToken(),
        isResponden : req.session.responden,
        number : data.nomor
      })
    }
  }
  async save(req, res) {
    if (!req.session.esirup) {
      req.session.esirup = []
    }
    req.session.esirup.push(req.body)
    res.status(200).json({
      title: "Terima Kasih",
      icon: "success",
    })
  }
  async final(req, res) {
    const addSurvey = new Survey({
      responden: req.session.responden.nama,
      questioner: "Esirup",
      answer: req.session.esirup,
      saran: req.body.saran
    })
    const resultSurvey = await addSurvey.save()
    req.session.destroy(function() {
      res.render('final',{
        csrfToken : null
      })
    })
  }
} 

module.exports = new Esirup()