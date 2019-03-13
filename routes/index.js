const express = require('express')
const router = express.Router()

const seriesController = require('../controllers/seriesController')
const observationController = require('../controllers/observationController')

router.get('/import', seriesController.importAll)

router.get('/', seriesController.ShowAllSerieses)

router.get('/unemployment', observationController.unrate)

router.get('/:seriesID', seriesController.ShowSeriesByID)

module.exports = router
