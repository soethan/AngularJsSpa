"use strict";
angular.module("app").directive("wwaDashboard", [function () {
    return {
        scope: {

        },
        template: "<ps-dashboard></ps-dashboard>",
        link: function (scope) {
            scope.title = "My First Dashboard";

            scope.gridsterOpts = {
                columns: 12,
                margins: [40, 20],
                outerMargin: false,
                pushing: true,
                floating: true,
                swapping: false
            };

            scope.widgetDefinitions = [
                {
                    title: "Temperature",
                    settings: {
                        sizeX: 3,
                        sizeY: 3,
                        minSizeX: 2,
                        minSizeY: 2,
                        template: "<wwa-temperature></wwa-temperature>",
                        widgetSettings: {
                            id: 1000,
                            templateUrl: "app/dialogs/wwaSelectLocationTemplate.html",
                            controller: "wwaSelectLocationController"
                        }
                    }
                }
            ];

            scope.widgets = [
                //{
                //    title: "First",
                //    sizeX: 3,
                //    sizeY: 3,
                //    row: 0,
                //    col: 0,
                //    template: "<wwa-temperature></wwa-temperature>",
                //    widgetSettings: {
                //        id: 1000
                //    }
                //},
                //{
                //    title: "Second",
                //    sizeX: 2,
                //    sizeY: 4,
                //    row: 0,
                //    col: 5
                //}
            ];
        }
    };
}]);