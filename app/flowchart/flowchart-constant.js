(function() {

  'use strict';

  var constants = {
    htmlPrefix: 'fc',
    topConnectorType: 'topConnector',
    bottomConnectorType: 'bottomConnector',
    curvedStyle: 'curved',
    lineStyle: 'line'
  };
  constants.canvasClass = constants.htmlPrefix + '-canvas';
  constants.selectedClass = constants.htmlPrefix + '-selected';
  constants.activeClass = constants.htmlPrefix + '-active';
  constants.hoverClass = constants.htmlPrefix + '-hover';
  constants.draggingClass = constants.htmlPrefix + '-dragging';
  constants.edgeClass = constants.htmlPrefix + '-edge';
  constants.connectorClass = constants.htmlPrefix + '-connector';
  constants.magnetClass = constants.htmlPrefix + '-magnet';
  constants.nodeClass = constants.htmlPrefix + '-node';
  constants.topConnectorClass = constants.htmlPrefix + '-' + constants.topConnectorType + 's';
  constants.bottomConnectorClass = constants.htmlPrefix + '-' + constants.bottomConnectorType + 's';
  constants.canvasResizeThreshold = 200;
  constants.canvasResizeStep = 200;

  angular
    .module('flowchart')
    .constant('flowchartConstants', constants);

}());
