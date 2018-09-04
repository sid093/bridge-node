require('dotenv').config();
const Jobs = require('./lib/Jobs');

Jobs.OpenWeatherMap('q=Noida,in').start();