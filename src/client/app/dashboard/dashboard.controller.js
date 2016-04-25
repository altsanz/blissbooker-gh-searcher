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



    activate();

    

    function activate() {
      // var promises = [getMessageCount(), getPeople()];
      // return $q.all(promises).then(function() {
      //   logger.info('Activated Dashboard View');
      // });
    }

    /**
     * Get list of repositories from new query
     */
    function getReposNewQuery(query) {
      // @TODO check for empty query
      vm.repoList = [];
      
      return dataservice.getRepos(query, vm.nextPage, reposPerPage*pagesFirstTime).then(function(data) {
        console.log(data.items);
        vm.nextPage += pagesFirstTime;  

        vm.repoList = data.items.slice(0, reposPerPage);
        vm.cachedNextPage = data.items.slice(reposPerPage, data.items.length);
        return vm.repoList;
      });
    }


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

  }
})();
