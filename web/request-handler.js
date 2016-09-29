var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var helpers = require('./http-helpers.js');


exports.handleRequest = function(request, response) {
  console.log('request method: ', request.method);
  var statusCode = 200;
  var result = ''; 

  if (request.method === 'GET') {
    statusCode = 200;
    if (request.url === '/') {
      var filePath = archive.paths.siteAssets + '/index.html';
      fs.readFile(filePath, 'utf8', function(err, contents) {
        results = contents;
        response.writeHead(statusCode, helpers.headers);
        response.end(contents);
      });
    } else {
      var filePath = archive.paths.archivedSites + request.url;
      fs.exists(filePath, function(exists) {
        if (exists) {
          fs.readFile(filePath, 'utf8', function(err, contents) {
            results = contents;
            response.writeHead(statusCode, helpers.headers);
            response.end(contents);
          });
        } else {
          statusCode = 404;
          response.writeHead(statusCode, helpers.headers);
          response.end();
        }

      });
    }
  } else if (request.method === 'POST') {
    statusCode = 302;
    request.on('data', function(data) {
      var filePath = archive.paths.list;
      data = data.toString().slice(4) + '\n';
      fs.appendFile(filePath, data, function(err) {
        if (!err) {
          response.writeHead(statusCode, helpers.headers);
          response.end(data);
        }
      });
    });
  } 
};
