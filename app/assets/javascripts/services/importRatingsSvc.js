'use strict';

/*jslint latedef:false*/

angular.module('QuepidApp')
  .service('importRatingsSvc', [
    '$http',
    function importRatingsSvc(
      $http
    ) {
      var self = this;

      // Functions
      self.importCSVFormat = importCSVFormat;
      self.importRREFormat = importRREFormat;

      function importCSVFormat(theCase, csv, clearQueries) {
        var ratings = [];

        angular.forEach(csv, function(rating) {
          ratings.push({
            query_text: rating['query'],
            doc_id:     rating['docid'],
            rating:     rating['rating'],
          });
        });

        var data = {
          ratings:        ratings,
          clear_queries:  clearQueries,
        };

        // The API only sees a hash of ratings.
        return $http.post('/api/import/ratings/' + theCase.caseNo + '?file_format=hash', data);
      }

      function importRREFormat(theCase, rreJson, clearQueries) {

        var data = {
          rre_json:       rreJson,
          clear_queries:  clearQueries,
        };

        return $http.post('/api/import/ratings/' + theCase.caseNo + '?file_format=rre', data);

      }
    }
  ]);
