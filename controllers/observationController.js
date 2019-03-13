const Observation = require('../models/Observation')

exports.unrate = (req, res, next) => {
  Observation.unemploymentRateForYearRange(
    req.query.begin_year,
    req.query.end_year
  )
    .then(table => {
      res.status(200).json({
        status: 'success',
        table,
        message: 'Showing annual unemployment rate from 1980 to 2015'
      })
    })
    .catch(error => next(error))
}
