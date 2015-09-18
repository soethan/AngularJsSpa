"use strict";
//http://jimhoskins.com/2012/12/17/angularjs-and-apply.html
//$scope.$apply() takes a function or an Angular expression string, and executes it, then calls $scope.$digest() to update any bindings or watchers.

angular.module("psFramework").controller("psFrameworkController",
    ["$rootScope", "$scope", "$window", "$timeout", "$location",
        function ($rootScope, $scope, $window, $timeout, $location) {
            $scope.isMenuVisible = true;
            $scope.isMenuButtonVisible = true;
            $scope.isMenuVertical = true;

            $scope.$on("ps-menu-item-selected-event", function (evt, data) {
                $scope.routeString = data.route;
                $location.path(data.route);
                checkWidth();
                broadcastMenuState();
            });

            $scope.$on("ps-menu-orientation-changed-event", function(evt, data) {
                $scope.isMenuVertical = data.isMenuVertical;
            });

            $($window).on("resize.psFramework", function () {//window event "resize" and we can attach namespace to event name
                $scope.$apply(function () {
                    checkWidth();
                    broadcastMenuState();
                });
            });

            $scope.$on("$destroy", function () {
                $($window).off("resize.psFramework");
            });

            var checkWidth = function () {
                var width = Math.max($($window).width(), $window.innerWidth);
                $scope.isMenuVisible = (width >= 768);
                $scope.isMenuButtonVisible = !$scope.isMenuVisible;
                if ($scope.isMenuButtonVisible) {
                    $scope.isMenuVertical = true;
                }
            };

            $scope.menuButtonClicked = function () {
                $scope.isMenuVisible = !$scope.isMenuVisible;
                broadcastMenuState();
                $scope.$apply();
            };

            var broadcastMenuState = function () {
                $rootScope.$broadcast("ps-menu-show",
                    {
                        show: $scope.isMenuVisible,
                        isVertical: $scope.isMenuVertical,
                        allowHorizontalToggle: !$scope.isMenuButtonVisible
                    });
            };
            $timeout(function () {
                checkWidth();
            }, 0);
        }
    ]
);