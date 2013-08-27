/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 * node module documentation at http://nodejs.org/api/modules.html. */
var messages = {};
var messageKey = 0;

var handlePostRequest = function(request){
  var someData = '';

  request.on('data', function(data){
     someData+=data;
  });

  request.on('end', function(){
    var parsedData = JSON.parse(someData);
    var results = {};
    var messageObj = {};
    messageObj.username = parsedData.username;
    messageObj.text = parsedData.text;
    messageObj.roomname = parsedData.roomname;
    messageObj.createdAt = new Date();
    messageKey++;
    messages[messageKey] = messageObj;
  });
};

var handleGetRequest = function(request, response){
  request.on("error", function(){
    console.log("There was an error. Frick");
  });
  var messageObject = {};
  messageObject.results = messages;
  response.write(JSON.stringify(messageObject));
};

exports.handlePostRequest = handlePostRequest;
exports.handleGetRequest = handleGetRequest;