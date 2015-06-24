(function() {

  'use strict';

  function Modelfactory(Modelvalidation) {
    var connectorsHtmlElements = {};
    var canvasHtmlElement = null;

    return function innerModelfactory(model, selectedObjects, edgeAddedCallback) {
      Modelvalidation.validateModel(model);
      var modelservice = {
        selectedObjects: selectedObjects
      };
      if (!angular.isFunction(edgeAddedCallback)) {
        edgeAddedCallback = angular.noop;
      }

      function selectObject(object) {
        if (modelservice.selectedObjects.indexOf(object) === -1) {
          modelservice.selectedObjects.push(object);
        }
      }

      function deselectObject(object) {
        var index = modelservice.selectedObjects.indexOf(object);
        if (index === -1) {
          throw new Error('Tried to deselect an unselected object');
        }
        modelservice.selectedObjects.splice(index, 1);
      }

      function toggleSelectedObject(object) {
        if (isSelectedObject(object)) {
          deselectObject(object);
        } else {
          selectObject(object);
        }
      }

      function isSelectedObject(object) {
        return modelservice.selectedObjects.indexOf(object) !== -1;
      }

      modelservice.connectors = {

        setHtmlElement: function(connectorId, element) {
          connectorsHtmlElements[connectorId] = element;
        },

        getHtmlElement: function(connectorId) {
          return connectorsHtmlElements[connectorId];
        },

        _getCoords: function(connectorId, centered) {
          var element = this.getHtmlElement(connectorId);
          var canvas = modelservice.getCanvasHtmlElement();
          if (element === null || element === undefined || canvas === null) {
            return {x: 0, y: 0};
          }
          var connectorElementBox = element.getBoundingClientRect();
          var canvasElementBox = canvas.getBoundingClientRect();


          var coords = {
            x: connectorElementBox.left - canvasElementBox.left,
            y: connectorElementBox.top - canvasElementBox.top
          };
          if (centered) {
            coords = {
              x: Math.round(coords.x + element.offsetWidth / 2),
              y: Math.round(coords.y + element.offsetHeight / 2)
            };
          }
          return coords;
        },

        getCoord: function(connectorId) {
          return this._getCoords(connectorId, false);
        },

        getCenteredCoord: function(connectorId) {
          return this._getCoords(connectorId, true);
        }

      };

      modelservice.nodes = {
        getConnectorsByType: function(node, type) {
          return node.connectors.filter(function(connector) {
            return connector.type === type
          });
        },

        select: selectObject,
        deselect: deselectObject,
        toggleSelected: toggleSelectedObject,
        isSelected: isSelectedObject,

        _addConnector: function(node, connector) {
          node.connectors.push(connector);
          try {
            Modelvalidation.validateNode(node);
          } catch (error) {
            node.connectors.splice(node.connectors.indexOf(connector), 1);
            throw error;
          }
        },

        delete: function(node) {
          if (this.isSelected(node)) {
            this.deselect(node);
          }
          var index = model.nodes.indexOf(node);
          if (index === -1) {
            if (node === undefined) {
              throw new Error('Passed undefined');
            }
            throw new Error('Tried to delete not existing node')
          }

          var connectorIds = this.getConnectorIds(node);
          for (var i = 0; i < model.edges.length; i++) {
            var edge = model.edges[i];
            if (connectorIds.indexOf(edge.source) !== -1 || connectorIds.indexOf(edge.destination) !== -1) {
              modelservice.edges.delete(edge);
              i--;
            }
          }
          model.nodes.splice(index, 1);
        },

        getSelectedNodes: function() {
          return model.nodes.filter(function(node) {
            return modelservice.nodes.isSelected(node)
          });
        },

        handleClicked: function(node, ctrlKey) {
          if (ctrlKey) {
            modelservice.nodes.toggleSelected(node);
          } else {
            modelservice.deselectAll();
            modelservice.nodes.select(node);
          }
        },

        _addNode: function(node) {
          try {
            model.nodes.push(node);
            Modelvalidation.validateNodes(model.nodes);
          } catch(error) {
            model.nodes.splice(model.nodes.indexOf(node), 1);
            throw error;
          }
        },

        getConnectorIds: function(node) {
          return node.connectors.map(function(connector) {
            return connector.id
          });
        }
      };

      modelservice.edges = {

        sourceCoord: function(edge) {
          return modelservice.connectors.getCenteredCoord(edge.source, edge.source);
        },

        destCoord: function(edge) {
          return modelservice.connectors.getCenteredCoord(edge.destination);
        },

        select: selectObject,
        deselect: deselectObject,
        toggleSelected: toggleSelectedObject,
        isSelected: isSelectedObject,

        delete: function
          (edge) {
          var index = model.edges.indexOf(edge);
          if (index === -1) {
            throw new Error('Tried to delete not existing edge')
          }
          if (this.isSelected(edge)) {
            this.deselect(edge)
          }
          model.edges.splice(index, 1);
        },

        getSelectedEdges: function() {
          return model.edges.filter(function(edge) {
            return modelservice.edges.isSelected(edge)
          });
        },

        handleEdgeMouseClick: function(edge, ctrlKey) {
          if (ctrlKey) {
            modelservice.edges.toggleSelected(edge);
          } else {
            modelservice.deselectAll();
            modelservice.edges.select(edge);
          }
        },

        _addEdge: function(sourceConnector, destConnector) {
          Modelvalidation.validateConnector(sourceConnector);
          Modelvalidation.validateConnector(destConnector);
          var edge = {source: sourceConnector.id, destination: destConnector.id};
          Modelvalidation.validateEdges(model.edges.concat([edge]), model.nodes);
          model.edges.push(edge);
          edgeAddedCallback(edge);
        }
      };

      modelservice.selectAll = function() {
        angular.forEach(model.nodes, function(value) {
          modelservice.nodes.select(value);
        });
        angular.forEach(model.edges, function(value) {
          modelservice.edges.select(value);
        });
      };

      modelservice.deselectAll = function() {
        modelservice.selectedObjects.splice(0, modelservice.selectedObjects.length);
      };

      modelservice.deleteSelected = function() {
        var edgesToDelete = modelservice.edges.getSelectedEdges();
        angular.forEach(edgesToDelete, function(edge) {
          modelservice.edges.delete(edge);
        });
        var nodesToDelete = modelservice.nodes.getSelectedNodes();
        angular.forEach(nodesToDelete, function(node) {
          modelservice.nodes.delete(node);
        });
      };

      modelservice.setCanvasHtmlElement = function(element) {
        canvasHtmlElement = element;
      };

      modelservice.getCanvasHtmlElement = function() {
        return canvasHtmlElement;
      };

      return modelservice;
    }

  }

  angular.module('flowchart')
    .service('Modelfactory', Modelfactory);

})();
