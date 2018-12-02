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
  'access-control-max-age': 5 // Seconds.
};

let store = {
  results: []
};

let requestHandler = (req, res) => {
  let statusCode = 200;
  let headers = defaultCorsHeaders;
  let pathName = url.parse(req.url).pathname;

  console.log('//////////////////////////////////');
  console.log(req.method);

  if (pathName === '/classes/messages') {
    if (req.method === 'POST') {
      let message = [];
      
      req.on('data', (chunk) => {
        message.push(chunk);
      }).on('end', () => {
        message = Buffer.concat(message).toString();
        message = JSON.parse(message);
        message.objectId = store.results.length;
        store.results.push(message);
      });

      statusCode = 201;
      headers['Content-Type'] = 'application/json';
      res.writeHead(statusCode, headers);
      res.end(JSON.stringify(store));
    } else if (req.method === 'GET') {
      headers['Content-Type'] = 'application/json';
      res.writeHead(statusCode, headers);
      res.end(JSON.stringify(store));
    } else if (req.method === 'OPTIONS') {
      // headers['Content-Type'] = 'application/json';
      res.writeHead(statusCode, headers);
      res.end();
    }
 
  } else {
    statusCode = 404;
    res.writeHead(statusCode, headers);
    res.end();
  }

};

module.exports.requestHandler = requestHandler;



