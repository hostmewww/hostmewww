"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = require("../../../app/core/utils");
var navigationTreeNode_1 = require("../../../app.ko/workshops/navigation/navigationTreeNode");
var NavigationTree = (function () {
    function NavigationTree(items) {
        var _this = this;
        this.onFocusChange = this.onFocusChange.bind(this);
        this.addNode = this.addNode.bind(this);
        this.onNodeDragStart = this.onNodeDragStart.bind(this);
        this.onNodeDragEnd = this.onNodeDragEnd.bind(this);
        this.onNullPointerMove = this.onNullPointerMove.bind(this);
        this.onAcceptNodeBefore = this.onAcceptNodeBefore.bind(this);
        this.onAcceptNodeAfter = this.onAcceptNodeAfter.bind(this);
        this.dispatchUpdates = this.dispatchUpdates.bind(this);
        var nodes = new Array();
        items.forEach(function (x) { return nodes.push(_this.navigationItemToNode(x)); });
        this.nodes = ko.observableArray(nodes);
        this.selectedNode = ko.observable();
        this.focusedNode = ko.observable();
        this.onUpdate = new ko.subscribable();
        this.placeholderElement = $("<div class=\"placeholder\"></div>")[0];
        this.placeholderElement.onmousemove = this.onNullPointerMove;
    }
    NavigationTree.prototype.onNullPointerMove = function (event) {
        event.stopPropagation();
    };
    NavigationTree.prototype.onFocusChange = function (node) {
        this.focusedNode(node);
    };
    NavigationTree.prototype.dispatchUpdates = function () {
        var _this = this;
        var items = new Array();
        this.nodes().forEach(function (n) { return items.push(_this.nodeToNavigationItem(n)); });
        this.onUpdate.notifySubscribers(items);
    };
    NavigationTree.prototype.navigationItemToNode = function (navItem) {
        var _this = this;
        var node = new navigationTreeNode_1.NavigationTreeNode(navItem);
        node.hasFocus.subscribe(function (focused) {
            if (focused) {
                _this.onFocusChange(node);
            }
        });
        node.onUpdate.subscribe(this.dispatchUpdates);
        if (navItem.navigationItems) {
            navItem.navigationItems.forEach(function (child) {
                var childNode = _this.navigationItemToNode(child);
                childNode.parent = node;
                node.nodes.push(childNode);
            });
        }
        return node;
    };
    NavigationTree.prototype.addNode = function (label) {
        var _this = this;
        var focusedNode = this.focusedNode();
        if (focusedNode) {
            var navitem = { key: Utils.guid(), label: label };
            var node = new navigationTreeNode_1.NavigationTreeNode(navitem);
            node.parent = focusedNode;
            focusedNode.nodes.push(node);
            node.hasFocus.subscribe(function (focused) {
                if (focused) {
                    _this.onFocusChange(node);
                }
            });
            node.onUpdate.subscribe(this.dispatchUpdates);
            this.dispatchUpdates();
            return node;
        }
    };
    NavigationTree.prototype.nodeToNavigationItem = function (node) {
        var _this = this;
        var navigationItems = null;
        if (node.nodes().length > 0) {
            navigationItems = [];
            node.nodes().forEach(function (x) { return navigationItems.push(_this.nodeToNavigationItem(x)); });
        }
        var navigationItem = {
            key: node.id,
            label: node.label(),
            navigationItems: navigationItems
        };
        var permalinkKey = node.permalinkKey();
        var url = node.url();
        var isExternal = /^(http|https):\/\/[^ "]+$/.test(node.url());
        if (isExternal || !permalinkKey) {
            navigationItem.externalUrl = url;
            navigationItem.permalinkKey = null;
        }
        else {
            navigationItem.permalinkKey = permalinkKey;
            navigationItem.externalUrl = null;
        }
        return navigationItem;
    };
    NavigationTree.prototype.getNavigationItems = function () {
        var _this = this;
        var navigationItems = [];
        this.nodes().forEach(function (x) { return navigationItems.push(_this.nodeToNavigationItem(x)); });
        return navigationItems;
    };
    NavigationTree.prototype.onNodeDragStart = function (payload, node) {
        var width = node.clientWidth + "px";
        var height = node.clientHeight + "px";
        this.placeholderElement.style.width = width;
        this.placeholderElement.style.height = height;
        $(node).after(this.placeholderElement);
    };
    NavigationTree.prototype.onNodeDragEnd = function (widget) {
        $(this.placeholderElement).remove();
    };
    NavigationTree.prototype.onAcceptNodeBefore = function (node, acceptingNode) {
        $(acceptingNode).before(this.placeholderElement);
    };
    NavigationTree.prototype.onAcceptNodeAfter = function (node, acceptingNode) {
        $(acceptingNode).after(this.placeholderElement);
    };
    return NavigationTree;
}());
exports.NavigationTree = NavigationTree;
