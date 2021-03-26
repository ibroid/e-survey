const Model = require('../models/Responden')
const { words } =  require('capitalize');
class RespondenController {
  constructor() {

  }
  async save(req, res) {
    const table = new Model({
      nama:  words(req.body.nama),
      asal: words(req.body.asal),
      jenis_kelamin: req.body.jenis_kelamin,
      umur : req.body.umur
    });
    req.session.responden = await table.save()
    res.status(200).json({
      icon : "success",
      title : "Terima Kasih"
    })
  }
}

module.exports = new RespondenController()