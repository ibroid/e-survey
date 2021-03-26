const Model = require('../models/Esikat')
const Survey = require('../models/Survey')
class Esikat {
  constructor() {}
  async view(req, res) {
    const QuesNumber = (!req.session.esikat) ? 1 : 1 + parseInt(req.session.esikat[req.session.esikat.length - 1].number)
    const [data] = await Model.question.find({
      nomor: QuesNumber
    })
    if (!data) {
      res.render('saran', {
        csrfToken : req.csrfToken(),
        action : '/save_survey_esikat'
      })
    } else {
      res.render('esikat', {
        pertanyaan : data.pertanyaan,
        answers : await Model.answer.find({ nomor: data.nomor }),
        csrfToken : req.csrfToken(),
        isResponden : req.session.responden,
        number : data.nomor
      })
    }
  }
  async save(req, res) {
    if (!req.session.esikat) {
      req.session.esikat = []
    }
    req.session.esikat.push(req.body)
    res.status(200).json({
      title: "Terima Kasih",
      icon: "success",
    })
  }
  async final(req, res) {
    const addSurvey = new Survey({
      responden: req.session.responden.nama,
      questioner: "Esikat",
      answer: req.session.esikat,
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

module.exports = new Esikat()