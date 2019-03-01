// Load HTTP module
var http = require("http");

// Create HTTP server and listen on port 8000
http.createServer(function(request, response) {
  // Set the response HTTP header with status and content type
  response.writeHead(200, {'Content-Type': 'text/plain'});

  // Send response body
  response.end('Hello World\n');
}).listen(8000);

// Print URL for accessing server
console.log('Server running at http://127.0.0.1:8000/');
