/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 * node module documentation at http://nodejs.org/api/modules.html. */
var messages = [];

var handlePostRequest = function(request){
  var someData = '';

  request.on('data', function(data){
     someData+=data;
  });

  request.on('end', function(){
    var parsedData = JSON.parse(someData);
    var messageObj = {};
    messageObj.username = parsedData.username;
    messageObj.text = parsedData.text;
    messageObj.roomname = parsedData.roomname;
    messageObj.createdAt = new Date();
    messages.push(messageObj);
  });
};

var handleGetRequest = function(request){
  
};

exports.handlePostRequest = handlePostRequest;
exports.handleGetRequest = handleGetRequest;