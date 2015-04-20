var Promise    = require('bluebird');
var rekt       = require('rekt').rekt;
var assert     = require('assert');
var _          = require('lodash');
var Book       = requireLocal('models/book.js');
var Page       = requireLocal('models/page.js');
var Difference = requireLocal('models/difference.js');

function mergeBooks(books) {

  return new Promise(function(resolve, reject) {
    if (!_.isUndefined(books)) {
      var finalBooks = {};
      _.forEach(books, function(book) {
        finalBooks[book.items[0].id] = finalBooks[book.items[0].id] || {};
        console.log(finalBooks);
      });
    } else {
      reject(new rekt.BadRequest('You must provide books to import'));
    }
  });
}

module.exports = function(router) {
  router.route('/book-import')
    .all(function(req, res, next) {

      if (req.token.subject === 'Tiltfactor' || req.token.subject === 'BHL') {
        next();
      } else {
        res.status(401);
        res.json({
          message: 'You don\'t have access to this.'
        });
      }
    })
    .post(function(req, res) {
      var books = req.body.items;

      mergeBooks(books);
      res.end();
    });
}
