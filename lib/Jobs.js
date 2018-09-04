const CronJob = require('cron').CronJob;
const Mongo = require('./Mongo');
const Axios = require('axios');

const EveryOneSecJob = func => new CronJob('* * * * * *', func);
const EveryTenMinJob = func => new CronJob('0 */10 * * * *', func);

const OpenWeatherMap = function(params) {
	console.log('Sending request to OpenWeatherMap.');
	const url = `https://api.openweathermap.org/data/2.5/weather?${params}&appid=${process.env.OPENWEATHERMAP_API_KEY}`;
	Axios.get(url).then(response => {
		if(response.status === 200) {
			console.log('Success response from OpenWeatherMap.');
			Mongo.insert('weather', 'city', response.data);
		} else {
			console.log('Error in response from OpenWeatherMap.');
		}
	})
	.catch(err => console.log('Error in request to OpenWeatherMap.'));
};


module.exports = exports = {
	ConsolePoll: text => EveryOneSecJob(() => console.log(text)),
	OpenWeatherMap: params => EveryTenMinJob(() => OpenWeatherMap(params))
};