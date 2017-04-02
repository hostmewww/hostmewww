"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NavigationTreeNode = (function () {
    function NavigationTreeNode(navitem) {
        var _this = this;
        this.moveNodeLeft = this.moveNodeLeft.bind(this);
        this.moveNodeRight = this.moveNodeRight.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.canAccept = this.canAccept.bind(this);
        this.insertBefore = this.insertBefore.bind(this);
        this.insertAfter = this.insertAfter.bind(this);
        this.id = navitem.key;
        this.label = ko.observable(navitem.label);
        this.url = ko.observable(navitem.externalUrl);
        this.permalinkKey = ko.observable(navitem.permalinkKey);
        this.nodes = ko.observableArray([]);
        this.collapsed = ko.observable(false);
        this.dragged = ko.observable(false);
        this.hasFocus = ko.observable(false);
        this.onUpdate = new ko.subscribable();
        document.addEventListener("keydown", this.onKeyDown, false);
        this.label.subscribe(function () { return _this.onUpdate.notifySubscribers(); });
        this.url.subscribe(function () { return _this.onUpdate.notifySubscribers(); });
    }
    NavigationTreeNode.prototype.isSiblingNode = function (node) {
        return this.parent && this.parent.nodes.indexOf(node) >= 0;
    };
    NavigationTreeNode.prototype.isChildNode = function (node) {
        return this.nodes.indexOf(node) >= 0;
    };
    NavigationTreeNode.prototype.isUncleNode = function (node) {
        return this.parent && this.parent.parent && this.parent.parent.nodes.indexOf(node) >= 0 && this.parent !== node;
    };
    NavigationTreeNode.prototype.moveNodeLeft = function () {
        if (!this.parent.parent) {
            return;
        }
        this.parent.nodes.remove(this);
        var ownIndex = this.parent.parent.nodes.indexOf(this.parent);
        this.parent.parent.nodes.splice(ownIndex + 1, 0, this);
        this.parent = this.parent.parent;
        this.onUpdate.notifySubscribers();
    };
    NavigationTreeNode.prototype.moveNodeRight = function () {
        var index = this.parent.nodes().indexOf(this);
        if (index === 0) {
            return;
        }
        var previousSibling = this.parent.nodes()[index - 1];
        this.parent.nodes.remove(this);
        this.parent = previousSibling;
        previousSibling.nodes.push(this);
        this.onUpdate.notifySubscribers();
    };
    NavigationTreeNode.prototype.canAccept = function (node) {
        return this.isSiblingNode(node) || this.isChildNode(node) || this.isUncleNode(node);
    };
    NavigationTreeNode.prototype.insertBefore = function (node) {
        if (this.parent && this.isSiblingNode(node) || this.isUncleNode(node) || this.isChildNode(node)) {
            node.parent.nodes.remove(node);
            var ownIndex = this.parent.nodes.indexOf(this);
            this.parent.nodes.splice(ownIndex, 0, node);
            node.parent = this.parent;
            this.onUpdate.notifySubscribers();
        }
    };
    NavigationTreeNode.prototype.insertAfter = function (node) {
        if (this.parent && this.isSiblingNode(node) || this.isUncleNode(node)) {
            node.parent.nodes.remove(node);
            var ownIndex = this.parent.nodes.indexOf(this);
            this.parent.nodes.splice(ownIndex + 1, 0, node);
            node.parent = this.parent;
            this.onUpdate.notifySubscribers();
        }
        if (this.parent && this.isChildNode(node)) {
            node.parent.nodes.remove(node);
            var ownIndex = this.parent.nodes.indexOf(this);
            this.parent.nodes.splice(ownIndex, 0, node);
            node.parent = this.parent;
            this.onUpdate.notifySubscribers();
        }
    };
    NavigationTreeNode.prototype.toggleCollapsed = function () {
        this.collapsed(!this.collapsed());
    };
    NavigationTreeNode.prototype.onKeyDown = function (event) {
        if (!this.hasFocus()) {
            return;
        }
        switch (event.keyCode) {
            case 37:
                this.moveNodeLeft();
                break;
            case 39:
                this.moveNodeRight();
                break;
            default:
        }
    };
    NavigationTreeNode.prototype.remove = function () {
        this.parent.nodes.remove(this);
        this.parent.onUpdate.notifySubscribers();
    };
    return NavigationTreeNode;
}());
exports.NavigationTreeNode = NavigationTreeNode;
