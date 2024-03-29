(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', Dataservice);

  Dataservice.$inject = ['$http', '$q', 'exception', 'logger', 'reposPerPage'];
  /* @ngInject */
  function Dataservice($http, $q, exception, logger, reposPerPage) {
    var service = {
      getRepos: getRepos
    };

    return service;

    function getRepos(query, page, qty) {
      qty = typeof qty !== 'undefined' ? qty : reposPerPage;
      page = typeof page !== 'undefined' ? page : 0;
      return $http.get('https://api.github.com/search/repositories', {
        params: {
          q: query,
          page: page,
          per_page: qty // jshint ignore:line
        }
      })
      .then(success, fail);
        

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getPeople')(e);
      }
    }
  }
})();
