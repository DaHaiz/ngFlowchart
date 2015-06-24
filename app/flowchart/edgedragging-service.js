(function() {

  'use strict';

  function Edgedraggingfactory(Modelvalidation) {
    function factory(modelservice, model, edgeDragging, isValidEdgeCallback, applyFunction) {
      if (isValidEdgeCallback === null) {
        isValidEdgeCallback = function() {
          return true;
        };
      }

      var edgedraggingService = {};

      var draggedEdgeSource = null;
      var dragOffset = {};

      edgeDragging.isDragging = false;
      edgeDragging.dragPoint1 = null;
      edgeDragging.dragPoint2 = null;

      var destinationHtmlElement = null;
      var oldDisplayStyle = "";

      edgedraggingService.dragstart = function(connector) {
        return function(event) {
          edgeDragging.isDragging = true;
          draggedEdgeSource = connector;
          edgeDragging.dragPoint1 = modelservice.connectors.getCenteredCoord(connector.id);

          var canvas = modelservice.getCanvasHtmlElement();
          if (!canvas) {
            throw new Error('No canvas while edgedraggingService found.');
          }
          dragOffset.x = -canvas.getBoundingClientRect().left;
          dragOffset.y = -canvas.getBoundingClientRect().top;

          edgeDragging.dragPoint2 = {
            x: event.clientX + dragOffset.x,
            y: event.clientY + dragOffset.y
          };

          event.dataTransfer.setData('Text', 'Just to support firefox');
          if (event.dataTransfer.setDragImage) {
            var invisibleDiv = angular.element('<div></div>')[0]; // This divs stays invisible, because it is not in the dom.
            event.dataTransfer.setDragImage(invisibleDiv, 0, 0);
          } else {
            destinationHtmlElement = event.target;
            oldDisplayStyle = destinationHtmlElement.style.display;
            event.target.style.display = 'none'; // Internetexplorer does not support setDragImage, but it takes an screenshot, from the draggedelement and uses it as dragimage.
            // Since angular redraws the element in the next dragover call, display: none never gets visible to the user.
          }
          event.stopPropagation();
        };
      };

      edgedraggingService.dragover = function(event) {
        if (edgeDragging.isDragging) {
          return applyFunction(function() {
            if (destinationHtmlElement !== null) {
              destinationHtmlElement.style.display = oldDisplayStyle;
            }

            edgeDragging.dragPoint2 = {
              x: event.clientX + dragOffset.x,
              y: event.clientY + dragOffset.y
            };

          });
        }
      };

      edgedraggingService.dragoverConnector = function(connector) {
        return function(event) {
          if (edgeDragging.isDragging) {
            edgedraggingService.dragover(event);
            try {
              Modelvalidation.validateEdges(model.edges.concat([{
                source: draggedEdgeSource.id,
                destination: connector.id
              }]), model.nodes);
            } catch (error) {
              if (error instanceof Modelvalidation.ModelvalidationError) {
                return true;
              } else {
                throw error;
              }
            }
            if (isValidEdgeCallback(draggedEdgeSource, connector)) {
              event.preventDefault();
              event.stopPropagation();
              return false;
            }
          }
        };
      };

      edgedraggingService.dragoverMagnet = function(connector) {
        return function(event) {
          if (edgeDragging.isDragging) {
            edgedraggingService.dragover(event);
              try {
              Modelvalidation.validateEdges(model.edges.concat([{
                source: draggedEdgeSource.id,
                destination: connector.id
              }]), model.nodes);
            } catch (error) {
              if (error instanceof Modelvalidation.ModelvalidationError) {
                return true;
              } else {
                throw error;
              }
            }
            if (isValidEdgeCallback(draggedEdgeSource, connector)) {
              return applyFunction(function() {
                edgeDragging.dragPoint2 = modelservice.connectors.getCenteredCoord(connector.id);
                event.preventDefault();
                event.stopPropagation();
                return false;
              });
            }
          }

        }
      };

      edgedraggingService.dragend = function(event) {
        if (edgeDragging.isDragging) {
          edgeDragging.isDragging = false;
          edgeDragging.dragPoint1 = null;
          edgeDragging.dragPoint2 = null;
          event.stopPropagation();
        }
      };

      edgedraggingService.drop = function(targetConnector) {
        return function(event) {
          if (edgeDragging.isDragging) {
            try {
              Modelvalidation.validateEdges(model.edges.concat([{
                source: draggedEdgeSource.id,
                destination: targetConnector.id
              }]), model.nodes);
            } catch (error) {
              if (error instanceof Modelvalidation.ModelvalidationError) {
                return true;
              } else {
                throw error;
              }
            }
            if (isValidEdgeCallback(draggedEdgeSource, targetConnector)) {
              modelservice.edges._addEdge(draggedEdgeSource, targetConnector);
              event.stopPropagation();
              event.preventDefault();
              return false;
            }
          }
        }
      };
      return edgedraggingService;
    }

    return factory;
  }

  angular.module('flowchart')
    .factory('Edgedraggingfactory', Edgedraggingfactory);

}());
