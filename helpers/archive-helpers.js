var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var expect = require('chai').expect;

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf8', function(err, contents) {
    if (!err) {
      callback(contents.split('\n'));
    }
  });
};

exports.isUrlInList = function(url, callback) {
  fs.readFile(exports.paths.list, 'utf8', function(err, contents) {
    if (!err) {
      callback(_.contains(contents.split('\n'), url));
    }
  });
};

exports.addUrlToList = function(url, callback) {
  fs.readFile(exports.paths.list, 'utf8', function(err, contents) {
    if (!err) {
      callback(contents.split('\n').push(url));
    }
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.readFile(exports.paths.list, 'utf8', function(err, contents) {
    if (!err) {
      callback(_.contains(contents.split('\n'), url));
    }
  });
};

exports.downloadUrls = function(urlArr) {
  fs.appendFile(exports.paths.list, 'utf8', function(err) {
    if (!err) {
      urlArr = urlArr.join('\n');
    }
  });
};
