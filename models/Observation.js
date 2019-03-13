const Promise = require('bluebird')
const pgp = require('pg-promise')({
  capSQL: true
})

const outsideAPI = require('./helpers/outsideAPI')
const { db } = require('./helpers/db')

const getObservations = (options = {}) => {
  return db.many(
    'SELECT * FROM observations WHERE series_id = ${seriesID}',
    options
  )
}

const importObservations = (options = {}) => {
  const { seriesID } = options
  const cs = new pgp.helpers.ColumnSet(
    ['observation_date', 'value', 'series_id'],
    {
      table: 'observations'
    }
  )
  return outsideAPI.loadObservations({ seriesID }).then(observations => {
    const values = observations.map(observation => {
      return {
        observation_date: observation.date,
        value: observation.value,
        series_id: seriesID
      }
    })
    const query = pgp.helpers.insert(values, cs)
    return db.task(t =>
      t
        .none('DELETE FROM observations WHERE series_id = $1', seriesID)
        .then(() => t.none(query))
    )
  })
}

const unemploymentRateForYearRange = (beginYear, endYear) =>
  db.many(
    "SELECT DATE_PART('year', observation_date) AS YEAR, to_char(AVG(value::FLOAT),'99.99%') AS RATE FROM observations WHERE series_id = 'UNRATE' AND observation_date >= $1 AND observation_date <= $2 GROUP BY(DATE_PART('year', observation_date)) ORDER BY(DATE_PART('year', observation_date))",
    [`1-1-${beginYear}`, `12-31-${endYear}`]
  )

module.exports = {
  getObservations,
  importObservations,
  unemploymentRateForYearRange
}
