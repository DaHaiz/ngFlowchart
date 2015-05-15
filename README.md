# angular-flowchart

angular-flowchart is an easy and customizable way to draw flowchart graphs using AngularJS.

## Getting Started

Install angular-flowchart via bower with `bower install angular-flowchart`

Run `gulp` in the angular-flowchart directory to start an interactive demo.

## Integration

Add stylesheet:
```html
    <link rel="stylesheet" href="bower_components/angular-flowchart/dist/flowchart.css" type="text/css">
```

Include script:
```html
  <script src="bower_components/angular-flowchart/dist/angular-flowchart.js"></script>
```

Insert this line where you want the flowchart to appear. It should fill up the given space, but if you are working on a complex site,
feel free to take a look in our flowchart.css stylesheet and overwrite the styles as you need.
```html
    <fc-canvas model="model" selected-objects="flowchartselected" edge-style="line"></fc-canvas>
```

The structure of `model` and `flowchartselected` of the `fc-canvas` directive looks like the following:
```javascript
  model = {
    nodes: [
      { id: 1, x: 10, y: 10, name: "My first node", connectors: [
          {id: 1, type: bottomConnector}]
      },
      { id: 2, x: 50, y: 50, name: "My seconde node", connectors: [
                {id: 2, type: topConnector}]
      }],
      edges: [{source: 1, destination: 2}]]
    };
    
  flowchartselected = [];
```

Your site should now show your first flowchart with two connected nodes.

## Program structure

TODO

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
}
```

### fc-canvas attributes
* `model` The model.
* `selected-objects` The selected nodes and edges as objects. Example: `[{id: 1, name: "First node", {...}}, {source: 1, destination: 2}]`
* `edge-style` "line" or "curved".
* `callbacks` Object with callbacks.
  * `edgeDoubleClick(event, edge)` will be called when an edge is doubleclicked.
  * `edgeMouseOver(event, edge)` will be called if the mouse hovers an edge.
  * `isValidEdge(sourceConnector, destinationConnector)` will be called, when the user tries to connect to edges. Returns `true` if this is an valid edge in your application or `false` otherwise.

### Modelservice
Our `Modelfactory` could contain some interesting functions for you to use.
Instantiate it with `Modelfactory(model, selectedObjects)` with model and selectedObjects as references to the same objects you gave the canvas.

### The Node template
The template of the node-directive is meant to be overwritten by yourself. You just need to register your own node.html file in the template cache with the key/path `flowchart/node.html`.

```javascript
module.run(function($templateCache) {
  $templateCache.put('flowchart/node.html', '<my><node><template></template></node></my>');
});```

The $scope will include following variables:
* `node` The nodeobject from the model.
* `modelservice` The modelservice instance of this canvas
* `underMouse` `true` when the mouse hovers this node, `false` otherwise.
* `selected` `true` if this node is selected, `false` otherwise.
* `mouseOverConnector` The connectorobject from the model witch is hovered by the mouse or `null`.
* `draggedNode` The nodeobject from the model witch is dragged.

### Gulp
We use gulp to build and manage our project. If you want to use some of our gulp tasks run `npm install` first. After you can run:

* `gulp` Will run our demo application and open it in your standard browser
* `gulp build` Will build the application and put the result in the dist folder.
* `gulp clean` Will delete all builded files from dist directory.
* `gulp test` Will run our test via karma in PhantomJs, Chrome, Firefox and IE

## Browser Support
angular-flowchart supports Chrome, Firefox, Opera, IE10+. Safari is not supported. PRs to expand support are welcome.

Right now it is only possible to have one canvas per site, this may changes in future.
