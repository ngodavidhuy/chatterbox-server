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

var requestHandler = (req, res) => {
  var statusCode = 200;
  let headers = defaultCorsHeaders;
  let pathName = url.parse(req.url).pathname;
  console.log('Serving req type ' + req.method + ' for url ' + req.url);

  if (req.method === 'GET' && pathName === '/classes/messages') {
    headers['Content-Type'] = 'application/json';
    res.writeHead(statusCode, headers);
    res.end(JSON.stringify({results}));
  } else if (req.method === 'POST' && pathName === '/classes/messages') {
    headers['Content-Type'] = 'application/json';
    let message = [];
    
    req.on('data', (chunk) => {
      message.push(chunk);
    }).on('end', () => {
      message = Buffer.concat(message).toString();
      results.push(JSON.parse(message));
    });

    statusCode = 201;
    res.writeHead(statusCode, headers);
    res.end(JSON.stringify({results}));
  } else {
    statusCode = 404;
    res.writeHead(statusCode, headers);
    res.end();
  }
};

module.exports.requestHandler = requestHandler;



