var http = require('http');

var id = Math.floor(Math.random() * 100);
var version = "1";
console.log('Starting server ID:' + id + " version:" + version);

var handleRequest = function(request, response) {
  console.log('Received request for URL: ' + request.url);
  response.writeHead(200);
  response.end('Hello World! version:' + version + ' id:' + id + "\n");
};
var www = http.createServer(handleRequest);
www.listen(8080);