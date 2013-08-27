/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 * node module documentation at http://nodejs.org/api/modules.html. */
var fs = require('fs');

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
    roomObj[messageKey] = messageObj;
    messages[roomName] = roomObj;
    saveToFile();
  });
  console.log("after postMessage messages: ", messages);
};

var handleGetMessages = function(request, response, roomName){

  request.on("error", function(){
    console.log("There was an error. Frick");
  });
  var messageObject = {};
  messageObject.results = messages[roomName];
  response.write(JSON.stringify(messageObject));
};

var firstConnection = function(){
  var data = '';
  fs.readFile('./messageData.txt','utf8', function(err, data){
    if(!err){
    console.log("DATA" , data);
    messages = JSON.parse(data);
  }
  });
  console.log("after firstConnection messages: ", messages);
};

var saveToFile = function() {
  fs.writeFile("./messageData.txt", JSON.stringify(messages), function(err){
    if(err){
      console.log('there was an error');
    } else{
      console.log('Successfully wrote to file');
    }
  });
};

var handleGetChatrooms = function(request, response){
  var keys = Object.keys(messages);
  console.log("THE KEYS  _>   ", keys);
  response.write(JSON.stringify(keys));
};

exports.handlePostMessage = handlePostMessage;
exports.handleGetMessages = handleGetMessages;
exports.firstConnection = firstConnection;
exports.handleGetChatrooms = handleGetChatrooms;