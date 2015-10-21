(function() {

  'use strict';

  function Edgedrawingservice(flowchartConstants) {
    function computeEdgeTangentOffset(pt1, pt2) {
        return (pt2.y - pt1.y) / 2;
    }

    function computeEdgeSourceTangent(pt1, pt2) {
      return {
        x: pt1.x,
        y: pt1.y + computeEdgeTangentOffset(pt1, pt2)
      };
    }

    function computeEdgeDestinationTangent(pt1, pt2) {
      return {
        x: pt2.x,
        y: pt2.y - computeEdgeTangentOffset(pt1, pt2)
      };
    }

    this.getEdgeDAttribute = function(pt1, pt2, style) {
      var dAddribute = 'M ' + pt1.x + ', ' + pt1.y + ' ';
      if (style === flowchartConstants.curvedStyle) {
        var sourceTangent = computeEdgeSourceTangent(pt1, pt2);
        var destinationTangent = computeEdgeDestinationTangent(pt1, pt2);
        dAddribute += 'C ' + sourceTangent.x + ', ' + sourceTangent.y + ' ' + destinationTangent.x + ', ' + destinationTangent.y + ' ' + pt2.x + ', ' + pt2.y;
      } else {
        dAddribute += 'L ' + pt2.x + ', ' + pt2.y;
      }
      return dAddribute;
    };
  }

  angular
    .module('flowchart')
    .service('Edgedrawingservice', Edgedrawingservice);

}());
