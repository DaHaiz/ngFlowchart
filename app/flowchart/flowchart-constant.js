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
  constants.hoverClass = constants.htmlPrefix + '-hover';
  constants.draggingClass = constants.htmlPrefix + '-dragging';
  constants.edgeClass = constants.htmlPrefix + '-edge';
  constants.connectorClass = constants.htmlPrefix + '-connector';
  constants.magnetClass = constants.htmlPrefix + '-magnet';
  constants.nodeClass = constants.htmlPrefix + '-node';
  constants.topConnectorClass = constants.htmlPrefix + '-' + constants.topConnectorType + 's';
  constants.bottomConnectorClass = constants.htmlPrefix + '-' + constants.bottomConnectorType + 's';

  angular
    .module('flowchart')
    .constant('flowchartConstants', constants);

}());
