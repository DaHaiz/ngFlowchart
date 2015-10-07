(function() {

  'use strict';

  function fcCanvas(flowchartConstants) {
    return {
      restrict: 'E',
      templateUrl: "flowchart/canvas.html",
      replace: true,
      scope: {
        model: "=",
        selectedObjects: "=",
        edgeStyle: '@',
        userCallbacks: '=?callbacks',
        automaticResize: '=?'
      },
      controller: 'canvasController',
      link: function(scope, element) {
        if (scope.edgeStyle !== flowchartConstants.curvedStyle && scope.edgeStyle !== flowchartConstants.lineStyle) {
          throw new Error('edgeStyle not supported.');
        }

        scope.flowchartConstants = flowchartConstants;
        element.addClass(flowchartConstants.canvasClass);
        element.on('dragover', scope.dragover);
        element.on('drop', scope.drop);

        scope.modelservice.setCanvasHtmlElement(element[0]);
      }
    }
  }

  angular
    .module('flowchart')
    .directive('fcCanvas', fcCanvas);

}());

