const router = require('express').Router()
const csrf = require('csurf')

const EsikatController = require('../controllers/EsikatController')
const EsirupController = require('../controllers/EsirupController')
const ComponentController = require('../controllers/ComponentController')
const RespondenController =  require('../controllers/RespondenController')
const ExportController = require('../controllers/ExportController')

const csrfProtection = csrf({cookie: true});

router.get('/', (req, res) => {
  res.render('dashboard' , {
    csrfToken : null
  })
})
router.get('/dashboard', (req, res) => {
  res.render('dashboard',  {
    csrfToken : null
  })
})

router.get('/xlsx', ExportController.readFile)

router.post('/anonymous', RespondenController.save)
router.post('/save_survey_esikat', csrfProtection, EsikatController.final)
router.post('/save_survey_esirup', csrfProtection, EsirupController.final)
router.get('/debug', (req, res) => {
  // req.session.esikat = null
  res.json({debug})
})
router.post('/save_respon_esikat', csrfProtection, EsikatController.save)
router.post('/save_respon_esirup', csrfProtection, EsirupController.save)
router.get('/esikat', csrfProtection, EsikatController.view)
router.get('/esirup', csrfProtection, EsirupController.view)
router.get('/components/data_diri' , ComponentController.patchFormDataDiri)
router.post('/save_data_diri', csrfProtection, RespondenController.save)


module.exports = router 