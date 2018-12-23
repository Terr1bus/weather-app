var express = require('express');
var router = express.Router();
var axios = require('axios');
var config = require('../config');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/city/:value', async function(req, res, next) {
  const url = 'https://nominatim.openstreetmap.org/search?format=json&city=';
  // console.log(req.params);

  const getCity = async (value) => {
    try {
      const response = await axios.get(url + encodeURI(value));
      const data = response.data;
      // console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  res.json(await getCity(req.params.value));
})

router.get('/weather-daily/:lat/:lon', async function(req, res, next) {
  const url = `https://api.darksky.net/forecast/${config.darksky_key}/`;

  const getWeather = async (lat, lon) => {
    try {
      const response = await axios.get(url + `${lat},${lon}?lang=ru&units=si&exclude=hourly,flags`)
      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  res.json(await getWeather(req.params.lat, req.params.lon));
})

router.get('/weather-hourly/:lat/:lon/:time', async function(req, res, next) {
  const url = `https://api.darksky.net/forecast/${config.darksky_key}/`;

  const getWeather = async (lat, lon, time) => {
    try {
      const response = await axios.get(url + `${lat},${lon},${time}?lang=ru&units=si&exclude=daily,currently,flags,`)
      const data = response.data;
      return data.hourly;
    } catch (error) {
      console.log(error);
    }
  }

  res.json(await getWeather(req.params.lat, req.params.lon, req.params.time));
})

module.exports = router;
