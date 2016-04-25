(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);


  DashboardController.$inject = ['$q', 'dataservice', 'logger'];
  /* @ngInject */
  function DashboardController($q, dataservice, logger) {
    var vm = this;

    vm.getRepos = getRepos;

    vm.repoList = [];

    activate();

    function activate() {
      // var promises = [getMessageCount(), getPeople()];
      // return $q.all(promises).then(function() {
      //   logger.info('Activated Dashboard View');
      // });
    }

    function getRepos(query) {
      // @TODO check for empty query
      return dataservice.getRepos(query).then(function(data) {
        vm.repoList = vm.repoList.concat(data.items);
        return vm.repoList;
      });
    }

  }
})();
