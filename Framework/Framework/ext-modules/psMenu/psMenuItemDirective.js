"use strict";
angular.module("psMenu").directive("psMenuItem", function () {
    return {
        scope: {
            label: '@',
            icon: '@',
            route: '@'
        },
        require: "^psMenu",//parent item
        templateUrl: "ext-modules/psMenu/psMenuItemTemplate.html",
        link: function (scope, el, attr, ctrl) {//ctrl is the reference to parent controller "psMenuController"

            scope.isActive = function () {
                return el === ctrl.getActiveElement();
            };

            scope.isVertical = function () {
                return ctrl.isVertical() || el.parents(".ps-subitem-section").length > 0;
            };

            el.on("click", function (evt) {
                evt.stopPropagation();
                evt.preventDefault();
                scope.$apply(function () {
                    ctrl.setActiveElement(el);
                    ctrl.setRoute(scope.route);
                });
            });
        }
    };

});