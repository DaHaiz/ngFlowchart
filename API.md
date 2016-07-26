# ngFlowchart [![Bower version](https://badge.fury.io/bo/ngFlowchart.svg)](https://github.com/ONE-LOGIC/ngFlowchart) [![Build Status](https://travis-ci.org/ONE-LOGIC/ngFlowchart.svg?branch=master)](https://travis-ci.org/ONE-LOGIC/ngFlowchart/) [![Dependency Status](https://gemnasium.com/ONE-LOGIC/ngFlowchart.svg)](https://gemnasium.com/ONE-LOGIC/ngFlowchart)


## Table of Contents
* [Getting Started](README.md#getting-started)
* [Integration](README.md#integration)
* [API](#api)
  * [Model](#the-model) 
  * [fc-canvas attribute](#fc-canvas-attributes)
  * [Setting your own node template](#the-node-template)
* [Browser Support](README.md#browser-support)


## Api

### The model

```javascript
{
  nodes: [Node],
  edges: [Edge]
}
```

#### Node
```javascript
{
  id: integer,
  name: string,
  x: integer, // x-coordinate of the node relative to the canvas.
  y: integer, // y-coordinate of the node relative to the canvas.
  connectors: [Connector]
}
```

#### Connector
```javascript
{
  id: integer,
  type: string
}
```

#### Edge
```javascript
{
 source: Connector.id
 destination: Connector.id
 active: boolean
}
```

### fc-canvas attributes
* `model` The model.
* `selected-objects` The selected nodes and edges as objects. Example: `[{id: 1, name: "First node", {...}}, {source: 1, destination: 2}]`
* `edge-style` "line" or "curved".
* `automatic-resize` If `true` the canvas will adjust its size while node dragging and allow "endless" dragging.
* `drag-animation` Either `repaint` (default) or `shadow` where `repaint` repaints the whole flowchart including edges according to new position while `shadow` show the new position only by showing a shadow of the node at the new position and repaints the edges only at the end of dragging.
* `callbacks` Object with callbacks.
  * `edgeAdded` will be called if an edge is added by ngFlowchart. 
  * `edgeDoubleClick(event, edge)` will be called when an edge is doubleclicked.
  * `edgeMouseOver(event, edge)` will be called if the mouse hovers an edge.
  * `isValidEdge(sourceConnector, destinationConnector)` will be called, when the user tries to connect to edges. Returns `true` if this is an valid edge in your application or `false` otherwise.
  * `edgeRemoved(edge)` will be called if an edge has been removed
  * `nodeRemoved(node)` will be called if a node has been removed
  * `nodeCallbacks` an object which will be available in the scope of the node template. This is usefull, to register a doubleclick handler on a node or similiar things. Every method that is handed into the `nodeCallbacks` will be available in the node template via the `callbacks` attribute.
 
### The Node template
Easily change the look and feel of the graph by writing your own node template. This is a simple AngularJS template registered with our `NodeTemplatePath` provider:

```javascript
angular.module('yourApp', ['flowchart'])
  .config(function(NodeTemplatePathProvider) {
    NodeTemplatePathProvider.setTemplatePath("path/to/your/template/node.html");
  })
```

The $scope in this template includes following variables:
* `node` The node object from the model.
* `modelservice` The modelservice instance of this canvas.
* `underMouse` `true` when the mouse hovers this node, `false` otherwise.
* `selected` `true` if this node is selected, `false` otherwise.
* `mouseOverConnector` The connector object from the model witch is hovered by the mouse or `null`.
* `draggedNode` The node object from the model witch is dragged.
* `nodeCallbacks` The object you assigned to `nodeCallbacks` on the `callbacks` attribute of `fc-canvas`.

### Modelservice
Our `Modelfactory` could contain some interesting functions for you to use.
Instantiate it with `Modelfactory(model, selectedObjects)` with model and selectedObjects as references to the same objects you gave the canvas.