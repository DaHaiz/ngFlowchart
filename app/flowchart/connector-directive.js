(function() {

  'use strict';

  function fcConnector(flowchartConstants) {
    return {
      restrict: 'A',
      link: function(scope, element) {
        element.attr('draggable', 'true');

        element.on('dragover', scope.callbacks.edgeDragoverConnector);
        element.on('drop', scope.callbacks.edgeDrop(scope.connector));
        element.on('dragend', scope.callbacks.edgeDragend);
        element.on('dragstart', scope.callbacks.edgeDragstart(scope.connector));
        element.on('mouseenter', scope.callbacks.connectorMouseEnter(scope.connector));
        element.on('mouseleave', scope.callbacks.connectorMouseLeave(scope.connector));

        element.addClass(flowchartConstants.connectorClass);
        scope.$watch('mouseOverConnector', function(value) {
          if (value === scope.connector) {
            element.addClass(flowchartConstants.hoverClass);
          } else {
            element.removeClass(flowchartConstants.hoverClass);
          }
        });

        scope.modelservice.connectors.setHtmlElement(scope.connector.id, element[0]);
      }
    };
  }

  angular
    .module('flowchart')
    .directive('fcConnector', fcConnector);

}());
