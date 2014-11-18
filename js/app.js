// initialize the app
angular.module('StaffingUI', [
    'ngRoute'
]);

angular.module('StaffingUI').run(function(TitleFactory, SkillFactory) {
    TitleFactory.fetch();
    SkillFactory.fetch();
});

angular.module('StaffingUI').config(function($routeProvider) {
    'use strict';

    $routeProvider
        .when('/', {
            templateUrl: 'templates/home.html'
        })
        .when('/users', {
            templateUrl: 'templates/users.html',
            controller: 'UserCtrl'
        })
        .when('/titles', {
            templateUrl: 'templates/titles.html',
            controller: 'TitleCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});

angular.module('StaffingUI').controller('NavbarCtrl', function($scope, $location) {
    'use strict';

    $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
    };
});

angular.module('StaffingUI').factory('TitleFactory', function($http) {
    var titles = [];

    var fetch = function() {
        $http.get('http://localhost:3000/titles').success(function(response) {
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

angular.module('StaffingUI').factory('SkillFactory', function($http) {
    var skills = [];

    var fetch = function() {
        $http.get('http://localhost:3000/skills').success(function(response) {
            // use angular.copy() to retain the original array which the controllers are bound to
            // tasks = response will overwrite the array with a new one and the controllers loose the reference
            // could also do tasks.length = 0, then push in the new items
            angular.copy(response, skills);
        });
    };

    return {
        skills: skills,
        fetch: fetch
    };
});

angular.module('StaffingUI').controller('UserCtrl', function($scope, $http, TitleFactory, SkillFactory) {
    'use strict';

    $http.get('http://localhost:3000/users').success(function(response) {
        $scope.users = response;
    });

    $scope.titles = TitleFactory.titles;
    $scope.skills = SkillFactory.skills;
    $scope.skillSelection = [];

    // when skills collection changes, populate the skillSelection collection
    // with objects containing the id and a boolean selected property
    $scope.$watchCollection('skills', function(newValue, oldValue) {
        $scope.skillSelection = $scope.skills.map(function(item) {
            return {id: item.id, selected: false};
        });
    });

    $scope.upsertUser = function(user) {
        var params = {
            user: user
        };

        console.log($scope.skillSelection);
        
        // if (user.id) {
        //     $http.put('http://localhost:3000/users/' + user.id, params);
        // } else {
        //     $http.post('http://localhost:3000/users', params).success(function(response) {
        //         $scope.users.push(response);
        //     });
        // }

        $scope.user = {};
    };

    $scope.editUser = function(user) {
        $scope.user = user;

        // reset skillSelection collection based on the user
        $scope.skillSelection = $scope.skills.map(function(item) {
            if ($scope.userHasSkill(item)) {
                return {id: item.id, selected: true};
            } else {
                return {id: item.id, selected: false};
            }
        });
    };

    $scope.deleteUser = function(user) {
        $http.delete('http://localhost:3000/users/' + user.id).success(function(response) {
            // remove from users array by id
            for (var i = 0; i < $scope.users.length; i++){
                if ($scope.users[i].id == user.id) {
                    $scope.users.splice(i, 1);

                    break;
                }
            }
        });
    };

    $scope.userHasSkill = function(skill) {
        var found = [];

        if (typeof $scope.user !== 'undefined' && typeof $scope.user.skills !== 'undefined') {
            found = $scope.user.skills.filter(function(item) {
                return item.id === skill.id;
            });
        }

        return found.length > 0;
    };
});

angular.module('StaffingUI').controller('TitleCtrl', function($scope, $http, TitleFactory) {
    'use strict';

    $scope.titles = TitleFactory.titles;

    $scope.upsertTitle = function(title) {
        var params = {
            title: title
        };
        
        if (title.id) {
            $http.put('http://localhost:3000/titles/' + title.id, params);
        } else {
            $http.post('http://localhost:3000/titles', params).success(function(response) {
                $scope.titles.push(response);
            });
        }

        $scope.title = {};
    };

    $scope.editTitle = function(title) {
        $scope.title = title;
    };

    $scope.deleteTitle = function(title) {
        $http.delete('http://localhost:3000/titles/' + title.id).success(function(response) {
            // remove from users array by id
            for (var i = 0; i < $scope.titles.length; i++){
                if ($scope.titles[i].id == title.id) {
                    $scope.titles.splice(i, 1);

                    break;
                }
            }
        });
    };
});
