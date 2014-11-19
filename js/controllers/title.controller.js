angular.module('StaffingUI').controller('TitleCtrl', function($scope, $http, ServerUrl, TitleFactory) {
    'use strict';

    $scope.titles = TitleFactory.titles;

    $scope.upsertTitle = function(title) {
        var params = {
            title: title
        };
        
        if (title.id) {
            $http.put(ServerUrl + 'titles/' + title.id, params).success(function(response) {
                TitleFactory.fetch();
            });
        } else {
            $http.post(ServerUrl + 'titles', params).success(function(response) {
                TitleFactory.fetch();
            });
        }

        $scope.title = {};
    };

    $scope.editTitle = function(title) {
        $scope.title = title;
    };

    $scope.deleteTitle = function(title) {
        $http.delete(ServerUrl + 'titles/' + title.id).success(function(response) {
            $scope.titles.splice($scope.titles.indexOf(title), 1);

            $scope.title = {};
        });
    };
});