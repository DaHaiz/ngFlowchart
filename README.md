# ngFlowchart [![Bower version](https://badge.fury.io/bo/ngFlowchart.svg)](https://github.com/ONE-LOGIC/ngFlowchart) [![Build Status](https://travis-ci.org/ONE-LOGIC/ngFlowchart.svg?branch=master)](https://travis-ci.org/ONE-LOGIC/ngFlowchart/) [![Dependency Status](https://gemnasium.com/ONE-LOGIC/ngFlowchart.svg)](https://gemnasium.com/ONE-LOGIC/ngFlowchart)

ngFlowchart is an easy and customizable way to draw flowchart graphs using AngularJS. Its main features are:
* Native AngularJS support
* An easy way to customize the look of nodes, by writing your own [template](#the-node-template) 
* Automatically adjusts size to its graph

<a href="http://one-logic.github.io/ngFlowchart/dist/index.html" target="_blank">
  <img src="liveDemo.gif" alt="Live Demo"/>
</a>
<a href="http://one-logic.github.io/ngFlowchart/dist/index.html" target="_blank">Visit the live demo</a>

## Getting Started

Install ngFlowchart via bower with `bower install ngFlowchart`

Run `gulp` in the ngFlowchart directory to start an interactive demo.

## Table of Contents
* [Getting Started](#getting-started)
* [Integration](#integration)
* [API](API.md#api)
  * [Model](API.md#the-model)
  * [fc-canvas attribute](API.md#fc-canvas-attributes)
  * [Setting your own node template](API.md#the-node-template)
* [Browser Support](#browser-support)

## Integration

Add stylesheet:
```html
<link rel="stylesheet" href="bower_components/ngFlowchart/dist/flowchart.css" type="text/css">
```

Include script:
```html
<script src="bower_components/ngFlowchart/dist/ngFlowchart.js"></script>
```

Use the `fc-canvas` directive to display the graph:
```html
<fc-canvas model="model" selected-objects="flowchartselected" edge-style="line"></fc-canvas>
```

Add `model` and `selectedObjects` to your scope:
```javascript
model = {
  nodes: [
    { 
      id: 1, 
      x: 10, 
      y: 10, 
      name: "My first node", 
      connectors: [
        {
          id: 1, 
          type: bottomConnector
        }
      ]
    },
    { 
      id: 2, 
      x: 50, 
      y: 50, 
      name: "My seconde node", 
      connectors: [
        {
          id: 2, 
          type: topConnector
        }
      ]
    }
  ],
  edges: [
    {
      source: 1, 
      destination: 2,
      active: false
    }
  ]
};
    
flowchartselected = [];
```

Your site should now show your first flowchart with two connected nodes.

## Browser Support
ngFlowchart supports Chrome, Firefox, Opera and IE10+. Safari is not supported. PRs to expand support are welcome.

Right now it is only possible to have one canvas per site, this may changes in future.

###Sponsors
Thanks to BrowserStack for kindly helping us improve cross browser support.