var url = require("url");
var fs = require("fs");
var querystring = require("querystring");

// Store all of our messages (in memory, no persistence after server
// process ends, sorry):
var messageLog = [];

exports.handleRequest = function (req, res) {

  var pathname = url.parse(req.url).pathname;
  console.log("Serving request type " + req.method + " for path " + pathname);
  
  if (pathname === "/send" && req.method === "POST") {
    /* Recieve posted messages - this comes from the basic-client.html
     * form, so we expect the post data to have "message" and
     * "username" fields. */
    var postData = "";
    req.setEncoding("utf8");

    /* Post data sometimes comes in in several chunks, so set up
     * listeners for receiving a new chunk and for receving the end
     * of the post data. Just concatenate all the chunks unil the
     * post data ends. */
    req.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
    });

    req.addListener("end", function() {
      // Parse out the message and username
      var message = querystring.parse(postData).message;
      var username = querystring.parse(postData).username;
      
      // Keep a log of objects with username and message properties
      messageLog.push({username: username,
                       message: message});

      /* after taking post submission, redirect back to main page
       * so user still sees their form */
      res.writeHead(302, {'Location': "/"});
      res.end("\n");
    });
  }
  else if (pathname === "/log" && req.method === "GET") {
    /* On a request for /log, spit out JSON of the message log
     * that we're storing: */
    res.writeHead(200, {'Content-Type': "text/plain"});
    res.end(JSON.stringify(messageLog));
  }
  else if (req.method === "GET") {
    // Serve static files from the "pages" directory
    var filePath;
    if (pathname === "/") {
      // special case - requesting the root should give back 
      // basic-client.html.
      filePath = "pages/basic-client.html";
    } else {
      // otherwise, look for the requested file inside pages/:
      filePath = "pages" + pathname;
    }
    // Attempt to read the file; if not found, respond with a 404:
    fs.readFile(filePath, function (err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': "text/plain"});
        res.end("404 - not found");
      } else {
        // If found, respond with the file contents:
        res.writeHead(200, {'Content-Type': "text/html"});
        res.end(data);
      }
    });
  }
  else {
    res.writeHead(404, {'Content-Type': "text/plain"});
    res.end("404 - not found");
  }
};