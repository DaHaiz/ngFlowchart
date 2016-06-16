(function() {

  'use strict';

  function CanvasService($rootScope) {

    var canvasHtmlElement;

    this.setCanvasHtmlElement = function(element) {
      canvasHtmlElement = element;
    };

    this.getCanvasHtmlElement = function() {
      return canvasHtmlElement;
    };

    this.dragover = function(scope, callback) {
        var handler = $rootScope.$on('notifying-dragover-event', callback);
        scope.$on('$destroy', handler);
    };
    
    this._notifyDragover = function(event) {
      $rootScope.$emit('notifying-dragover-event', event);
    };

    this.drop = function(scope, callback) {
      var handler = $rootScope.$on('notifying-drop-event', callback);
      scope.$on('$destroy', handler);
    };

    this._notifyDrop = function(event) {
      $rootScope.$emit('notifying-drop-event', event);
    };
  }

  angular.module('flowchart')
      .service('FlowchartCanvasService', CanvasService);

}());
