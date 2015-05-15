(function() {

  'use strict';

  function fcMagnet(flowchartConstants) {
    return {
      restrict: 'AE',
      link: function(scope, element) {
        element.addClass(flowchartConstants.magnetClass);

        element.on('dragover', scope.callbacks.edgeDragoverMagnet(scope.connector));
        element.on('drop', scope.callbacks.edgeDrop(scope.connector));
        element.on('dragend', scope.callbacks.edgeDragend);
      }
    }
  }

  angular.module('flowchart')
    .directive('fcMagnet', fcMagnet);
}());
