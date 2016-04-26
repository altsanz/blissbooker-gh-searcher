(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);


  DashboardController.$inject = ['$q', 'dataservice', 'logger', 'reposPerPage', 'pagesFirstTime', 'ghApiFirstPage'];
  /* @ngInject */
  function DashboardController($q, dataservice, logger, reposPerPage, pagesFirstTime, ghApiFirstPage) {
    var vm = this;


    vm.getRepos = getReposNewQuery;

    vm.getMoreRepos = getMoreRepos;

    vm.repoList = [];

    vm.query = '';

    /**
    * Holds information to retrieve more repositories.
    **/
    vm.nextPage = ghApiFirstPage;

    vm.cachedNextPage = [];

    vm.loading = false;

    vm.copySuccess = copySuccess;

    vm.copyError = copyError;

    //////////////////

    /**
     * Get list of repositories from new query
     */
    function getReposNewQuery(query) {
      vm.repoList = [];
      if(query !== '') {
        vm.loading = true;
        return dataservice.getRepos(query, vm.nextPage, reposPerPage*pagesFirstTime).then(function(data) {
          vm.nextPage += pagesFirstTime;  

          vm.repoList = data.items.slice(0, reposPerPage);
          vm.cachedNextPage = data.items.slice(reposPerPage, data.items.length);
          vm.loading = false;
          return vm.repoList;
        });
      }
    }

    /**
    * Method that loads cached page and retrieves next 10 items
    */
    function getMoreRepos() {
      
      vm.repoList = vm.repoList.concat(vm.cachedNextPage);
      
      vm.cachedNextPage = [];
        return dataservice.getRepos(vm.query, vm.nextPage, reposPerPage).then(function(data) {
          vm.cachedNextPage = data.items;
          vm.nextPage += 1;
          return vm.repoList;
        }, function(error) {
          // Do query to github /rate_limit to see when it's reseted
          });
    }

    function copySuccess(e) {
      logger.success('Copied!');
    }

    function copyError(e) {
      logger.error('We couldn\'t make it! :(');
    }

  }
})();
