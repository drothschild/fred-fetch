const Series = require('../models/Series')

exports.ShowAllSerieses = (req, res, next) => {
  Series.getAllSerieses()
    .then(serieses => {
      res.render('serieses', { title: 'All FRED Series', serieses })
    })
    .catch(error => next(error))
}

exports.ShowSeriesByID = (req, res, next) => {
  const seriesID = req.params.seriesID
  Series.getOneSeries({ seriesID })
    .then(series => {
      res.render('series', { title: series.title, series })
    })
    .catch(error => next(error))
}

exports.importAll = (req, res, next) => {
  Series.importSerieses()
    .then(() => {
      res.redirect('/')
    })
    .catch(error => next(error))
}
