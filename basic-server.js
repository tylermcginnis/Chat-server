/* Import node's http module: */
var http = require("http");
var url = require('url');
var rh = require('./request-handler');

/* This is the callback function that will be called each time a
 * client (i.e.. a web browser) makes a request to our server. */

var requestListener = function (request, response) {
  var reply;
  console.log("Serving request type " + request.method + " for url " + request.url);
  var statusCode = 200;
  var headers = defaultCorsHeaders;

  headers['Content-Type'] = "text/plain";

  response.writeHead(statusCode, headers);

  if(request.method == 'POST'){
    rh.handlePostRequest(request);
    response.end("Post added");
  } else if (request.method == 'GET'){
    rh.handleGetRequest(request);
    response.end("Get Request Successful");
  }

  response.end('Default Response?');
};



var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};


var port = 8080;

var ip = "127.0.0.1";

var server = http.createServer(requestListener);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

/* To start this server, run:
     node basic-server.js
 *  on the command line.

 * To connect to the server, load http://127.0.0.1:8080 in your web
 * browser.

 * server.listen() will continue running as long as there is the
 * possibility of serving more requests. To stop your server, hit
 * Ctrl-C on the command line. */
