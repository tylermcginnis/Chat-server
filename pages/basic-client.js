$(document).ready(function() {
  var chatLog = $("#chat-log");
  var pollingInterval = 1000;

  chatLog.append("<p>Waiting for Node server...</p>");

  /* Periodically poll the server to see if there are new chat
   * messages: */
  window.setInterval(function() {
    /* In this function you will want to request chat messages from
     * your node server and display them in the chatLog div.
     * How to do that? You may want to take a look at the jquery
     * ajax documentation at: http://api.jquery.com/category/ajax/
     */

  }, pollingInterval);


  /* When user clicks the "Send" button, get the input field values
   * and send them to the server: */
  $("#send-button").click(function() {
    var serverUrl = "http://127.0.0.1:8080/send";

    var username = $("#username").val();
    var message = $("#message").val();
    /* In this function you should POST the username and message to
     * the server URL. The jquery ajax documentation will also be
     * handy here. */

  });
});

