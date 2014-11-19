'use strict';

angular.module('myAppRename.viewWiki', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/viewWiki', {
            templateUrl: 'app/viewWiki/viewWiki.html',
            controller: 'View3Ctrl'
        })
            .when('/viewWiki/:id', {
                templateUrl: 'app/viewWiki/viewWikiDetails.html',
                controller: 'bubbleController'
            })
            .otherwise({
                redirectTo: "/viewWiki"
            })
    }])

    .controller('View3Ctrl', ['$scope', '$http', 'CurrentWikiInformation', function ($scope, $http, CurrentWikiInformation) {
        $http({
            method: 'GET',
            url: 'api/titleabstract'
        }).
            success(function (data, status, headers, config) {
                $scope.wikis = data;
            }).
            error(function (data, status, headers, config) {
                $scope.error = data;
            });

        $scope.saveCurrentWiki = function (curWiki) {
            console.log('the clicked wiki is: ' + JSON.stringify(curWiki));
            CurrentWikiInformation.setInfo(curWiki);
        }
    }])

    .controller('bubbleController', ['$scope','$http', '$location',function ($scope,$http,$location) {
        $http({
            method: 'GET',
            url: 'api/wiki/'+$location.path().split("/")[2]
        }).
            success(function (data, status, headers, config) {
                console.log(data);
                $scope.wikiInformation = data;
            }).
            error(function (data, status, headers, config) {
                $scope.error = data;
            });
    }]);