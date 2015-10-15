angular.module('app', ['flowchart'])
  .factory('prompt', function() {
    return prompt;
  })
  .config(function(NodeTemplatePathProvider) {
    NodeTemplatePathProvider.setTemplatePath("flowchart/node.html");
  })

  .controller('AppCtrl', function AppCtrl($scope, prompt, Modelfactory, flowchartConstants) {

    var deleteKeyCode = 46;
    var ctrlKeyCode = 17;
    var aKeyCode = 65;
    var escKeyCode = 27;
    var nextNodeID = 10;
    var nextConnectorID = 20;
    var ctrlDown = false;

    var model = {
      nodes: [
        {
          name: "Example Node 1",
          id: 0,
          x: 0,
          y: 0,
          color: '#000',
          borderColor: '#000',
          connectors: [
            {
              type: flowchartConstants.topConnectorType,
              id: 6
            },
            {
              type: flowchartConstants.topConnectorType,
              id: 7
            },
            {
              type: flowchartConstants.topConnectorType,
              id: 8
            },
            {
              type: flowchartConstants.bottomConnectorType,
              id: 9
            },
            {
              type: flowchartConstants.bottomConnectorType,
              id: 10
            },
            {
              type: flowchartConstants.bottomConnectorType,
              id: 11

            }
          ]
        },
        {
          name: "Example Node 2",
          id: 1,
          x: 400,
          y: 200,
          color: '#F15B26',
          connectors: [
            {
              type: flowchartConstants.topConnectorType,
              id: 1
            },
            {
              type: flowchartConstants.topConnectorType,
              id: 2
            },
            {
              type: flowchartConstants.topConnectorType,
              id: 3
            },
            {
              type: flowchartConstants.bottomConnectorType,
              id: 4
            },
            {
              type: flowchartConstants.bottomConnectorType,
              id: 5
            },
            {
              type: flowchartConstants.bottomConnectorType,
              id: 12
            }
          ]
        }
      ],
      edges: [
        {
          source: 10,
          destination: 1
        }
      ]
    };

    $scope.flowchartselected = [];
    var modelservice = Modelfactory(model, $scope.flowchartselected);

    $scope.model = model;
    $scope.modelservice = modelservice;

    $scope.keyDown = function(evt) {
      if (evt.keyCode === ctrlKeyCode) {
        ctrlDown = true;
        evt.stopPropagation();
        evt.preventDefault();
      }
    };

    $scope.keyUp = function(evt) {

      if (evt.keyCode === deleteKeyCode) {
        modelservice.deleteSelected();
      }

      if (evt.keyCode == aKeyCode && ctrlDown) {
        modelservice.selectAll();
      }

      if (evt.keyCode == escKeyCode) {
        modelservice.deselectAll();
      }

      if (evt.keyCode === ctrlKeyCode) {
        ctrlDown = false;
        evt.stopPropagation();
        evt.preventDefault();
      }
    };

    $scope.addNewNode = function() {
      var nodeName = prompt("Enter a node name:", "New node");
      if (!nodeName) {
        return;
      }

      var newNode = {
        name: nodeName,
        id: nextNodeID++,
        x: 0,
        y: 0,
        color: '#F15B26',
        connectors: [
          {
            id: nextConnectorID++,
            type: flowchartConstants.topConnectorType
          },
          {
            id: nextConnectorID++,
            type: flowchartConstants.topConnectorType
          },
          {
            id: nextConnectorID++,
            type: flowchartConstants.topConnectorType
          },
          {
            id: nextConnectorID++,
            type: flowchartConstants.bottomConnectorType
          },
          {
            id: nextConnectorID++,
            type: flowchartConstants.bottomConnectorType
          },
          {
            id: nextConnectorID++,
            type: flowchartConstants.bottomConnectorType
          }
        ]
      };

      model.nodes.push(newNode);
    };

    $scope.addNewInputConnector = function() {
      var connectorName = prompt("Enter a connector name:", "New connector");
      if (!connectorName) {
        return;
      }

      var selectedNodes = modelservice.nodes.getSelectedNodes($scope.model);
      for (var i = 0; i < selectedNodes.length; ++i) {
        var node = selectedNodes[i];
        node.connectors.push({id: nextConnectorID++, type: flowchartConstants.topConnectorType});
      }
    };

    $scope.addNewOutputConnector = function() {
      var connectorName = prompt("Enter a connector name:", "New connector");
      if (!connectorName) {
        return;
      }

      var selectedNodes = modelservice.nodes.getSelectedNodes($scope.model);
      for (var i = 0; i < selectedNodes.length; ++i) {
        var node = selectedNodes[i];
        node.connectors.push({id: nextConnectorID++, type: flowchartConstants.bottomConnectorType});
      }
    };

    $scope.deleteSelected = function() {
      modelservice.deleteSelected();
    };

    $scope.callbacks = {
      edgeAdded: function() {
        alert('Edge added');
      },
      edgeDoubleClick: function() {
        alert('hi');
      },
      edgeMouseOver: function() {
        console.log('mouserover')
      },
      isValidEdge: function(source, destination) {
        return source.type === flowchartConstants.bottomConnectorType && destination.type === flowchartConstants.topConnectorType;
      },
      nodeCallbacks: {
        'doubleClick': function(event) {
          alert('Node was doubleclicked.')
        }
      }
    };
  });
