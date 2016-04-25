(function() {
  'use strict';

  angular
    .module('blocks.exception')
    .factory('exception', exception);

  /* @ngInject */
  function exception($q, logger) {
    var service = {
      catcher: catcher
    };
    return service;

    function catcher(message) {
      return function(e) {
        if(typeof e.status !== 'undefined') {
          if(e.status === 403) {
            logger.error('Rate limit to GH api exceeded. Please, try after some seconds');
          }
        } else {
          var thrownDescription;
          var newMessage;
          if (e.data && e.data.description) {
            thrownDescription = '\n' + e.data.description;
            newMessage = message + thrownDescription;
          }
          e.data.description = newMessage;
          logger.error(newMessage);
        }
        return $q.reject(e);
      };
    }
  }
})();
