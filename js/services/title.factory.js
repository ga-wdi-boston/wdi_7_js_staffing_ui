angular.module('StaffingUI').factory('TitleFactory', function($http, ServerUrl) {
    var titles = [];

    var fetch = function() {
        $http.get(ServerUrl + 'titles').success(function(response) {
            // use angular.copy() to retain the original array which the controllers are bound to
            // tasks = response will overwrite the array with a new one and the controllers loose the reference
            // could also do tasks.length = 0, then push in the new items
            angular.copy(response, titles);
        });
    };

    return {
        titles: titles,
        fetch: fetch
    };
});