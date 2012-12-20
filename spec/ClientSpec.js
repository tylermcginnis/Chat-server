describe("BasicChatClient", function() {
  var chatClient = null;
  var chatLogElem = null;

  beforeEach(function() {
    chatClient = new BasicChatClient();
    chatLogElem = $("<div></div>");
  });

  it("Should show a waiting message on startup", function() {
    chatClient.startListening(chatLogElem);
    expect( chatLogElem.html() ).toBe("<p>Waiting for Node server...</p>");
  });

  it("Should be able to send messages to the server", function() {
    chatClient.sendMessage("Frederick Douglass",
                           "Once you learn to read, you will be forever free.");

    // Message and username should now appear in server message log:
    var log = "";
    $.ajax({
      type: "GET",
      url: "http://127.0.0.1:8080/log",
      success: function(data, textStatus, xhr) {
        log = data;
      },
      dataType: "text",
      error: function(xhr, textStatus, errorThrown) {
        console.log("Error getting /log " + textStatus);
        console.log("Error is " + errorThrown);
      }
    });

    // Wait a couple seconds for server to resolve
    waits(2000);
    runs( function() {
      expect( log ).toContain("Frederick Douglass");
      expect( log ).toContain("Once you learn to read, you will be forever free.");
    });
  });

  it("Should display messages retrieved from the server", function() {
    // Send message to server from my side:
    $.ajax({
      type: "POST",
      data: {username: "A.Lincoln",
             message: "I believe this government cannot endure, permanently, half slave and half free."},
      url: "http://127.0.0.1:8080/send",
      error: function(xhr, textStatus, errorThrown) {
        console.log("Error posting to /send " + textStatus);
        console.log("Error is " + errorThrown);
      }
    });

    chatClient.startListening(chatLogElem);
    
    // wait a couple seconds for server to resolve
    waits(2000);
    // now client should show that message in its chat log
    runs( function(){   
      expect( chatLogElem.html() ).toContain("A.Lincoln");
      expect( chatLogElem.html() ).toContain("I believe this government cannot endure, permanently, half slave and half free.");
    });
  });
});