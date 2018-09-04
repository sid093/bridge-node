require('dotenv').config();
const http = require('http');
const Jobs = require('./lib/Jobs');

Jobs.OpenWeatherMap('q=Noida,in').start();

http.createServer((request, response) => {
	response.writeHead(200, { 'Content-Type': 'text/plain' });
  	response.end('Server running.');
}).listen(process.env.PORT);