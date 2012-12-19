$(document).ready(function() {
  var chatLog = $("#chat-log");
  var pollingInterval = 1000;

  /* Periodically poll the server to see if there are new chat
   * messages: */
  window.setInterval(function() {
    /* In this function you will want to request chat messages from
     * your node server and display them in the chatLog div.
     * How to do that? You may want to take a look at the jquery
     * ajax documentation at: http://api.jquery.com/category/ajax/
     */
  }, pollingInterval);
});