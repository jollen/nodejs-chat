var chatModule = (function($) {

// WebSocket object
var ws;

// The Div element selected by jQuery selector
var div = this;

function onWsMessage(message) {
   var json = JSON.parse(message.data);
	 
   if (json.type === 'message') {

     content.prepend('<h3>' + json.data.message + '</h3>');
   }
}

$.fn.receiveWebSocket = function () {
     content = this;

     ws.onmessage = onWsMessage;
};

$.fn.createWebSocket = function () {
  div = this;

  if ("WebSocket" in window)
  {
     // Let us open a web socket
     ws = new WebSocket("ws://182.50.155.56:8080/start", ['echo-protocol']);
     ws.onopen = function() {
	     div.html("<p>Connected.</p>");
     };
     ws.onclose = function() { 
        // websocket is closed.
        div.html("<p>Server closed.</p>");
     };
     ws.onerror = function() { 
        div.html("<h1>error</h1>");
     };
  } else {
     // The browser doesn't support WebSocket
     alert("WebSocket NOT supported by your Browser!");
  }
};

})($);
