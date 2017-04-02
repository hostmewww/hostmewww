"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DragTarget = (function () {
    function DragTarget(element, config, dragManager) {
        this.element = element;
        this.config = config;
        this.dragManager = dragManager;
        this.onPointerMove = this.onPointerMove.bind(this);
        element.addEventListener("mousemove", this.onPointerMove, false);
    }
    DragTarget.prototype.onPointerMove = function (event) {
        event.stopPropagation();
        if (!this.dragManager.dragged)
            return;
        var clientRect = this.element.getBoundingClientRect();
        var scrollY = window.scrollY | document.documentElement.scrollTop;
        var scrollX = window.scrollX | document.documentElement.scrollLeft;
        if (!(event.pageX > (clientRect.left + scrollX) &&
            event.pageX < (clientRect.right + scrollX) &&
            event.pageY > (clientRect.top + scrollY) &&
            event.pageY < (clientRect.bottom + scrollY))) {
            return;
        }
        var readyToAccept = this.config.accept && this.config.accept(this.dragManager.payload, this.dragManager.dragged);
        if (readyToAccept) {
            var before = false;
            if (this.config.flow === "vertical") {
                before = (event.pageY + clientRect.height / 2) < clientRect.bottom;
                if (before && this.config.onacceptbefore) {
                    this.config.onacceptbefore(this.dragManager.dragged, this.element, this.dragManager.payload);
                }
                if (!before && this.config.onacceptafter) {
                    this.config.onacceptafter(this.dragManager.dragged, this.element, this.dragManager.payload);
                }
            }
            if (this.config.flow === "horizontal") {
                before = (event.pageX + clientRect.width / 2) < clientRect.right;
                if (before && this.config.onacceptbefore) {
                    this.config.onacceptbefore(this.dragManager.dragged, this.element, this.dragManager.payload);
                }
                if (!before && this.config.onacceptafter) {
                    this.config.onacceptafter(this.dragManager.dragged, this.element, this.dragManager.payload);
                }
            }
            this.dragManager.setAcceptor(this, before);
        }
    };
    return DragTarget;
}());
exports.DragTarget = DragTarget;
