'use strict';

angular.module('myAppRename.viewCategories', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/viewCategories', {
            templateUrl: '/viewCategories/viewCategories.html',
            controller: 'CategoriesController'
        });
    }])

    .controller('CategoriesController', ['$scope', '$http', function ($scope, $http) {
        $http({
            method: 'GET',
            url: 'api/categories'
        }).
            success(function (data, status, headers, config) {
                $scope.allCategories = data;
            }).
            error(function (data, status, headers, config) {
                $scope.error = data;
            });

    }]);