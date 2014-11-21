angular.module('StaffingUI').directive('gaModal', function() {
    return {
        restrict: 'E',

        transclude: true,

        templateUrl: 'templates/partials/modal.html',

        scope: {
        	modalid: '@',
            title: '@'
        }
    };
});