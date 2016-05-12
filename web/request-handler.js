var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var url = require('url');
// require more modules/folders here!

var helpers = require('./http-helpers.js');

var results = [];


exports.handleRequest = function(request, response) {
  console.log("request method: ", request.method);
  var statusCode = 200;

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.

  if (request.method === 'GET') {

    // request.on('data', function(chunk) {
    //   console.log('Parsed: ', JSON.parse(chunk));
    //   console.log('Stringed', chunk.toString());
    //   resultsObj.results.push(JSON.parse(chunk));
    //   console.log('results: ', resultsObj);
    //   console.log('Stringified: ', JSON.stringify(results[0]));
    // });

    // var url_parts = url.parse(request.url);
    // console.log("parts", url_parts);
    // console.log("parts and pathname", url_parts.pathname);

    statusCode = 200;
    var filePath = archive.paths.archiveSites + request.url;
    console.log("request URL: ", filePath);

    fs.readFile(filePath, 'utf8', function(err, contents) {
      results = contents;
      response.writeHead(statusCode, helpers.headers);
      response.end(JSON.parse(contents));
    });

  } else if (request.method === 'POST') {
    statusCode = 201;
    request.on('data', function(data) {
      var filePath = archive.paths.list;
      fs.writeFile(filePath, data, function(err) {
        if (err) {throw err};
        response.writeHead(statusCode, helpers.headers);
        response.end();
      });
    });


  }

  if (request.url !== '/classes/messages' && request.url !== '/') {
    statusCode = 404;

  }

  // response.writeHead(statusCode, helpers.headers);

  // // response.end(/Volumes/student/Web-historian/test/testdata/sites.txt)
  // // response.end('archive.paths.list');
  // console.log('results: ' + results);
  // response.end();
};
