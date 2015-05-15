'use strict';

describe('test for node directive', function() {
  var $compile;
  var $rootScope;
  var modelService;
  var flowchartConstants;

  var node = {
    id: 1,
    name: 'testnode',
    connectors: [
      {
        type: 'bottomConnector',
        id: 1
      },
      {
        type: 'topConnector',
        id: 2
      }
    ]
  };

  beforeEach(function() {
    module(function($provide) {
      $provide.service('modelService', function() {
        this.nodes = {};
        this.nodes.getConnectorsByType = jasmine.createSpy('getConnectorsByType').and.callFake(function(node, type) {
          return node.connectors.filter(function(connector) {
            return connector.type === type;
          });
        });
        this.connectors = {};
        this.connectors.setHtmlElement = jasmine.createSpy('setHtmlElement');
      })
    });
    module('flowchart');
  });

  beforeEach(inject(function(_$compile_, _$rootScope_, _modelService_, _flowchartConstants_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    modelService = _modelService_;
    flowchartConstants = _flowchartConstants_;

    $rootScope.node = node;
    $rootScope.mouseOverConnector = null;
    $rootScope.selected = false;
    $rootScope.underMouse = false;
    $rootScope.draggedNode = false;
    $rootScope.callbacks = jasmine.createSpyObj('callbacks', ['nodeDragstart', 'nodeDragend', 'edgeDragstart', 'edgeDragend', 'edgeDrop', 'edgeDragoverConnector',
      'nodeMouseEnter', 'nodeMouseLeave', 'connectorMouseEnter', 'connectorMouseLeave', 'edgeDragoverMagnet']);

    this.innerNodeClicked = jasmine.createSpy('inner nodeClicked');
    $rootScope.callbacks.nodeClicked = jasmine.createSpy('nodeClicked').and.returnValue(this.innerNodeClicked);

    this.innerNodeDragStart = jasmine.createSpy('inner dragstart');
    $rootScope.callbacks.nodeDragstart = jasmine.createSpy('nodeDragStart').and.returnValue(this.innerNodeDragStart);

    this.innerNodeMouseEnter = jasmine.createSpy('inner nodeMouseEnter');
    $rootScope.callbacks.nodeMouseEnter.and.returnValue(this.innerNodeMouseEnter);

    this.innerNodeMouseLeave = jasmine.createSpy('inner nodeMouseEnter');
    $rootScope.callbacks.nodeMouseLeave.and.returnValue(this.innerNodeMouseLeave);

    this.innerEdgeDragoverMagnet = jasmine.createSpy('inner nodeMouseEnter');
    $rootScope.callbacks.edgeDragoverMagnet.and.returnValue(this.innerEdgeDragoverMagnet);

    $rootScope.modelservice = modelService;

  }));

  function getCompiledNode() {
    var node = $compile('<fc-node selected="selected" under-mouse="underMouse" node="node" mouse-over-connector="mouseOverConnector" modelservice="modelservice" dragged-node="draggedNode" callbacks="callbacks"></fc-node>')($rootScope);
    $rootScope.$digest();
    return node;
  }

  it('should be draggable', function() {
    var node = getCompiledNode();
    expect(node.attr('draggable')).toBe('true');
  });

  it('should have the node class', function() {
    var node = getCompiledNode();
    expect(node.hasClass(flowchartConstants.nodeClass)).toBe(true);
  });

  it('should have a selected class if selected', function() {
    $rootScope.selected = true;
    var node = getCompiledNode();
    expect(node.hasClass(flowchartConstants.selectedClass)).toBe(true);

    $rootScope.selected = false;
    $rootScope.$apply();
    expect(node.hasClass(flowchartConstants.selectedClass)).toBe(false);
  });

  it('should have a hovered class if hovered', function() {
    $rootScope.underMouse = true;
    var node = getCompiledNode();
    expect(node.hasClass(flowchartConstants.hoverClass)).toBe(true);

    $rootScope.underMouse = false;
    $rootScope.$apply();
    expect(node.hasClass(flowchartConstants.hoverClass)).toBe(false);
  });

  it('should have a dragging class if dragged', function() {
    $rootScope.draggedNode = node;
    var n = getCompiledNode();
    expect(n.hasClass(flowchartConstants.draggingClass)).toBe(true);

    $rootScope.draggedNode = null;
    $rootScope.$apply();
    expect(n.hasClass(flowchartConstants.draggingClass)).toBe(false);
  });


  it('should register the dragstart, dragend, mouseenter, mouseleave and click event', function() {
    var htmlNode = getCompiledNode();

    expect(this.innerNodeClicked).not.toHaveBeenCalled();
    htmlNode.triggerHandler('click');
    expect(this.innerNodeClicked).toHaveBeenCalled();

    expect(this.innerNodeDragStart).not.toHaveBeenCalled();
    htmlNode.triggerHandler('dragstart');
    expect(this.innerNodeDragStart).toHaveBeenCalled();

    expect(this.innerNodeMouseEnter).not.toHaveBeenCalled();
    htmlNode.triggerHandler('mouseenter');
    expect(this.innerNodeMouseEnter).toHaveBeenCalled();

    expect(this.innerNodeMouseLeave).not.toHaveBeenCalled();
    htmlNode.triggerHandler('mouseleave');
    expect(this.innerNodeMouseLeave).toHaveBeenCalled();

    expect($rootScope.callbacks.nodeDragend).not.toHaveBeenCalled();
    htmlNode.triggerHandler('dragend');
    expect($rootScope.callbacks.nodeDragend).toHaveBeenCalled();
  });

})
;
