const Promise = require('bluebird')

const outsideAPI = require('./helpers/outsideAPI')
const { db } = require('./helpers/db')
const Observation = require('./Observation')

const seriesIDs = ['GDPC1', 'UMCSENT', 'UNRATE']

// Plural
const getAllSerieses = () => db.any('SELECT * FROM series')

// Singular
const getOneSeries = (options = {}) =>
  db
    .one('SELECT * FROM series WHERE id = $1', [options.seriesID])
    .then(series => {
      return Observation.getObservations(options).then(observations => {
        series.observations = observations
        return series
      })
    })

// Plural
const importSerieses = () => {
  const promises = []
  seriesIDs.forEach(seriesID => {
    promises.push(
      outsideAPI.loadSeries({ seriesID }).then(series => {
        db.task(t =>
          t
            .none('DELETE FROM series where id= $1', seriesID)
            .then(() =>
              t.none(
                'INSERT INTO series VALUES(${id}, ${realtime_start}, ${realtime_end}, ${title}, ${observation_start}, ${observation_end}, ${frequency}, ${frequency_short}, ${units}, ${units_short}, ${seasonal_adjustment}, ${seasonal_adjustment_short}, ${last_updated}, ${popularity}, ${notes})',
                series
              )
            )
        )
      })
    )
    promises.push(Observation.importObservations({ seriesID }))
  })
  return Promise.all(promises)
}

module.exports = {
  getAllSerieses,
  getOneSeries,
  importSerieses
}
