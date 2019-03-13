const axios = require('axios')
require('dotenv').config()

// Plural
const loadObservations = (options = {}) => {
  const { seriesID } = options
  const uri = `https://api.stlouisfed.org/fred/series/observations?series_id=${seriesID}&api_key=${process
    .env.FRED_API_KEY}&file_type=json`
  const request = axios.get(uri)
  return request.then(response => response.data.observations).catch(error => {
    throw error
  })
}

// Singular
const loadSeries = (options = {}) => {
  const { seriesID } = options
  const uri = `https://api.stlouisfed.org/fred/series?series_id=${seriesID}&api_key=${process
    .env.FRED_API_KEY}&file_type=json`
  const request = axios.get(uri)
  return request.then(response => response.data.seriess[0]).catch(error => {
    throw error
  })
}
module.exports = {
  loadObservations,
  loadSeries
}
