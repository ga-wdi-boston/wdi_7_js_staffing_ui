angular.module('StaffingUI').controller('UserCtrl', function($scope, $http, $q, ServerUrl, UserFactory, TitleFactory, SkillFactory) {
    'use strict';

    $scope.users = UserFactory.users;
    $scope.titles = TitleFactory.titles;
    $scope.skills = SkillFactory.skills;

    var updateSkills = function(user_id) {
        var promises = [];

        _.forEach($scope.skills, function(item) {
            var isChecked = item.checked;
            var wasChecked = typeof _.find($scope.user.skills, {id: item.id}) !== 'undefined';

            // add skill
            if (isChecked && !wasChecked) {
                promises.push($http.put(ServerUrl + 'users/' + user_id + '/skills/' + item.id));
            }

            // remove skill
            if (!isChecked && wasChecked) {
                promises.push($http.delete(ServerUrl + 'users/' + user_id + '/skills/' + item.id));
            }
        });

        return promises;
    };

    var clearForm = function() {
        $scope.user = {};

        UserFactory.fetch();
        SkillFactory.resetChecked();
    };

    $scope.upsertUser = function(user) {
        var params = {
            user: user
        };
        
        if (user.id) {
            $http.put(ServerUrl + 'users/' + user.id, params).success(function(response) {
                $q.all(updateSkills(user.id)).then(function() {
                    clearForm();
                });
            });
        } else {
            $http.post(ServerUrl + 'users', params).success(function(response) {
                $q.all(updateSkills(response.id)).then(function() {
                    clearForm();
                });
            });
        }
    };

    $scope.editUser = function(user) {
        $scope.user = user;

        // update skills based on this user
        _.forEach($scope.skills, function(item) {
            if ($scope.userHasSkill(item)) {
                item.checked = true;
            }
        });
    };

    $scope.deleteUser = function(user) {
        $http.delete(ServerUrl + 'users/' + user.id).success(function(response) {
            // remove from users array by id
            for (var i = 0; i < $scope.users.length; i++){
                if ($scope.users[i].id == user.id) {
                    $scope.users.splice(i, 1);

                    break;
                }
            }

            clearForm();
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