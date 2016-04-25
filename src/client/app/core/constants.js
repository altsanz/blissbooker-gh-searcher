/* global toastr:false, moment:false */
(function() {
  'use strict';

  angular
    .module('app.core')
    .constant('toastr', toastr)
    .constant('moment', moment)
    .constant('reposPerPage', 10)
    .constant('pagesFirstTime', 2)
    .constant('ghApiFirstPage', 1);
})();
