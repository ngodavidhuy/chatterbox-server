/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
const url = require('url');

const defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

let results = [];

var requestHandler = (request, response) => {
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  let headers = defaultCorsHeaders;

  request.on('error', (err) => {
    console.error(err);
    response.statusCode = 400;
    response.end();
  });
  
  response.on('error', (err) => {
    console.error(err);
  });
  
  if (request.method === 'GET' && request.url === '/classes/messages') {
    headers['Content-Type'] = 'application/json';
    response.writeHead(response.statusCode, headers);
    response.end(JSON.stringify({results}));
  } 
  
  if (request.method === 'POST' && request.url === '/classes/messages') {
    headers['Content-Type'] = 'application/json';
    
    let message = [];
    request.on('data', (chunk) => {
      message.push(chunk);
    }).on('end', () => {
      message = Buffer.from(message.join());
      results.push(JSON.parse(message));
      response.end(JSON.stringify({results}));
    });
    
    response.statusCode = 201;
    response.writeHead(response.statusCode, headers);
    response.end();
  }
  
  response.statusCode = 404;
  response.end();
};

module.exports.requestHandler = requestHandler;


