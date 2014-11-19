angular.module('StaffingUI').factory('SkillFactory', function($http, ServerUrl) {
    var skills = [];

    var resetChecked = function() {
        _.forEach(skills, function(item) {
            item.checked = false;
        });
    };

    var fetch = function() {
        $http.get(ServerUrl + 'skills').success(function(response) {
            // use angular.copy() to retain the original array which the controllers are bound to
            // tasks = response will overwrite the array with a new one and the controllers loose the reference
            // could also do tasks.length = 0, then push in the new items
            angular.copy(response, skills);

            // add checked field to each skill for checkboxes
            resetChecked();
        });
    };

    return {
        skills: skills,
        fetch: fetch,
        resetChecked: resetChecked
    };
});