var express = require('express');
var router = express.Router();
var axios = require('axios');
require('dotenv').config();

var DARKSKY_KEY = process.env.DARKSKY_KEY || undefined;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/city/:value', async function(req, res, next) {
  const url = 'https://nominatim.openstreetmap.org/search?format=json&city=';

  const getCity = async value => {
    try {
      const response = await axios.get(url + encodeURI(value));
      const data = response.data;
      return data;
    } catch (error) {
      res.json({error: "Error was occured"});
    }
  }

  res.json(await getCity(req.params.value));
})

router.get('/weather-daily/:lat/:lon', async function(req, res, next) {
  const url = `https://api.darksky.net/forecast/${DARKSKY_KEY}/`;

  const getWeather = async (lat, lon) => {
    try {
      const response = await axios.get(`${url}${lat},${lon}?lang=ru&units=si&exclude=hourly,flags`)
      const data = response.data;
      return data;
    } catch (error) {
      res.json({error: "Error was occured"});
    }
  }

  res.json(await getWeather(req.params.lat, req.params.lon));
})

router.get('/weather-hourly/:lat/:lon/:time', async function(req, res, next) {
  const url = `https://api.darksky.net/forecast/${DARKSKY_KEY}/`;

  const getWeather = async (lat, lon, time) => {
    try {
      const response = await axios.get(`${url}${lat},${lon},${time}?lang=ru&units=si&exclude=daily,currently,flags,`)
      const data = response.data;
      return data.hourly;
    } catch (error) {
      res.json({error: "Error was occured"});
    }
  }

  res.json(await getWeather(req.params.lat, req.params.lon, req.params.time));
})

module.exports = router;
