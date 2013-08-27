/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 * node module documentation at http://nodejs.org/api/modules.html. */
var messages = {};
messages.general = {};
var messageKey = 0;

var handlePostMessage = function(request, roomName){
  var messageData = '';

  request.on('data', function(data){
     messageData+=data;
  });

  request.on('end', function(){
    var parsedData = JSON.parse(messageData);
    var roomObj = messages[roomName] || {};
    var messageKey = Object.keys(roomObj).length;
    var messageObj = {};
    messageObj.username = parsedData.username;
    messageObj.text = parsedData.text;
    messageObj.roomname = roomName;
    messageObj.createdAt = new Date();
    console.log("messageObj - ", messageObj);
    roomObj[messageKey] = messageObj;
    console.log("roomObj - ", roomObj);
    messages[roomName] = roomObj;
    console.log("messages - ", messages);
  });
};

var handleGetMessages = function(request, response, roomName){
  request.on("error", function(){
    console.log("There was an error. Frick");
  });
  var messageObject = {};
  messageObject.results = messages[roomName];
  console.log(messages);
  response.write(JSON.stringify(messageObject));
};

exports.handlePostMessage = handlePostMessage;
exports.handleGetMessages = handleGetMessages;