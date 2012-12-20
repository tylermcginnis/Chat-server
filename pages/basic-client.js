function BasicChatClient() {
  // URLs for checking the message log and for sending messages:
  this.serverUrl = "http://127.0.0.1:8080";
  this.messageLogUrl = this.serverUrl + "/log";
  this.sendMessageUrl = this.serverUrl + "/send";

  /* How long (in milliseconds) to wait between checking for
   * new messages: */
  this.pollingInterval = 1000;
}
BasicChatClient.prototype = {
  startListening: function(chatLogElem) {
    /* Expects to be passed a jquery reference
     * to a <div> where it can put the incoming chat messages. */
    chatLogElem.append("<p>Waiting for Node server...</p>");
    /* Periodically poll the server to see if there are new chat
     * messages: */
    window.setInterval(function() {
      /* In this function you will want to check messageLogUrl for
       * new messages and display them in the chatLogElem.
       * How to do that? You may want to take a look at the jquery
       * ajax documentation at: http://api.jquery.com/category/ajax/
       */
    }, this.pollingInterval);
  },

  sendMessage: function(username, message) {
    /* In this function you should POST the username and message to
     * the server URL. The jquery ajax documentation will also be
     * handy here. */
  }
};


$(document).ready(function() {
  // Create a client and start listening:
  var chatClient = new BasicChatClient();
  chatClient.startListening($("#chat-log"));

  /* When user clicks the "Send" button, get the input field values
   * and send them to the server: */
  $("#send-button").click(function() {
    var username = $("#username").val();
    var message = $("#message").val();
    chatClient.sendMessage(username, message);
  });
});

