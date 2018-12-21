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

  const getCity = async (value) => {
    try {
      const response = await axios.get(url + value);
      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  res.json(await getCity(req.params.value));
})

router.get('/weather/:lat/:lon', async function(req, res, next) {
  const url = `https://api.darksky.net/forecast/${config.darksky_key}/`;

  const getWeather = async (lat, lon) => {
    try {
      const response = await axios.get(url + `${lat},${lon}?lang=ru&units=si`)
      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  res.json(await getWeather(req.params.lat, req.params.lon));
})

module.exports = router;
