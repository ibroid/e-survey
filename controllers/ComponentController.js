const path = require('path')
class ComponentController {
  constructor() {}
  patchFormDataDiri(req, res) {
    res.sendFile(path.join(__dirname.replace('controllers', 'views') + '/components/form_data_diri.html'))
  }
}

module.exports = new ComponentController()