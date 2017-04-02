"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dragSource_1 = require("../../../app/ui/draggables/dragSource");
var dragTarget_1 = require("../../../app/ui/draggables/dragTarget");
var startDraggingTime = 300;
var DragManager = (function () {
    function DragManager() {
        this.pointerX = 0;
        this.pointerY = 0;
        this.startDragging = this.startDragging.bind(this);
        this.completeDragging = this.completeDragging.bind(this);
        this.onPointerMove = this.onPointerMove.bind(this);
        this.onPointerDown = this.onPointerDown.bind(this);
        this.onPointerUp = this.onPointerUp.bind(this);
        this.setAcceptor = this.setAcceptor.bind(this);
        this.registerDragSource = this.registerDragSource.bind(this);
        this.registerDragTarget = this.registerDragTarget.bind(this);
        this.resetDraggedElementPosition = this.resetDraggedElementPosition.bind(this);
        document.addEventListener("mousemove", this.onPointerMove, true);
        document.addEventListener("mouseup", this.onPointerUp, true);
    }
    DragManager.prototype.onPointerMove = function (event) {
        this.pointerX = event.clientX;
        this.pointerY = event.clientY;
        if (this.acceptor && this.acceptor.element.classList.contains("accepting")) {
            this.acceptor.element.classList.remove("accepting");
        }
        this.resetDraggedElementPosition();
    };
    DragManager.prototype.resetDraggedElementPosition = function () {
        if (!this.dragged)
            return;
        var offsetX = this.dragged.clientWidth * this.source.percentageOffsetX / 100;
        var offsetY = this.dragged.clientHeight * this.source.percentageOffsetY / 100;
        this.dragged.style.left = (this.pointerX - offsetX) + "px";
        this.dragged.style.top = (this.pointerY - offsetY) + "px";
    };
    DragManager.prototype.startDragging = function (source) {
        this.dragged = source.element;
        this.payload = source.configuration.payload;
        this.source = source;
        if (source.configuration.ondragstart) {
            var replacement = source.configuration.ondragstart(source.configuration.payload, source.element);
            if (replacement) {
                this.dragged = replacement;
            }
        }
        if (!this.dragged.parentElement) {
            document.body.appendChild(this.dragged);
        }
        if (source.configuration.sticky) {
            this.dragged.style.width = this.dragged.clientWidth + "px";
        }
        this.dragged.classList.add("dragged");
        this.resetDraggedElementPosition();
    };
    DragManager.prototype.completeDragging = function () {
        if (this.acceptor) {
            this.acceptor.element.classList.remove("accepting");
            if (this.acceptor.config.ondrop) {
                this.acceptor.config.ondrop(this.payload);
            }
            if (this.acceptor.config.ondropbefore && this.acceptBefore) {
                this.acceptor.config.ondropbefore(this.source.configuration.payload, this.source.element);
            }
            if (this.acceptor.config.ondropafter && !this.acceptBefore) {
                this.acceptor.config.ondropafter(this.source.configuration.payload, this.source.element);
            }
        }
        this.dragged.classList.remove("dragged");
        if (this.source.configuration.sticky) {
            this.dragged.style.removeProperty("left");
            this.dragged.style.removeProperty("top");
            this.dragged.style.removeProperty("width");
            this.dragged.style.removeProperty("height");
        }
        if (this.source.configuration.ondragend) {
            this.source.configuration.ondragend(this.source.configuration.payload, this.source.element);
        }
        this.payload = null;
        this.dragged = null;
        this.source = null;
        this.acceptor = null;
    };
    DragManager.prototype.onPointerUp = function (event) {
        clearTimeout(this.startDraggingTimeout);
        if (!this.dragged) {
            return;
        }
        this.completeDragging();
    };
    DragManager.prototype.registerDragSource = function (element, config) {
        new dragSource_1.DragSource(element, config, this);
    };
    DragManager.prototype.registerDragTarget = function (element, config) {
        new dragTarget_1.DragTarget(element, config, this);
    };
    DragManager.prototype.onPointerDown = function (source) {
        var _this = this;
        if (source.configuration.sticky) {
            this.startDraggingTimeout = setTimeout(function () { return _this.startDragging(source); }, startDraggingTime);
        }
        else {
            this.startDragging(source);
        }
    };
    ;
    DragManager.prototype.setAcceptor = function (acceptor, before) {
        this.acceptor = acceptor;
        if (!this.acceptor.element.classList.contains("accepting")) {
            this.acceptor.element.classList.add("accepting");
        }
        this.acceptBefore = before;
    };
    return DragManager;
}());
exports.DragManager = DragManager;
