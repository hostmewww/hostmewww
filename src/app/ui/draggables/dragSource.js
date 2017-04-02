"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DragSource = (function () {
    function DragSource(element, config, dragManager) {
        this.element = element;
        this.configuration = config;
        this.dragManager = dragManager;
        this.onPointerDown = this.onPointerDown.bind(this);
        element.addEventListener("mousedown", this.onPointerDown);
    }
    DragSource.prototype.onPointerDown = function (event) {
        var targetElement = event.target;
        if (this.configuration.preventDragging && this.configuration.preventDragging(targetElement)) {
            return;
        }
        if (event.buttons !== 1 || event["handled"]) {
            return;
        }
        event["handled"] = true;
        event.stopImmediatePropagation();
        event.preventDefault();
        var offsetX = event.pageX - $(this.element).offset().left;
        var offsetY = event.pageY - $(this.element).offset().top;
        this.percentageOffsetX = offsetX / this.element.clientWidth * 100;
        this.percentageOffsetY = offsetY / this.element.clientHeight * 100;
        this.dragManager.onPointerDown(this);
    };
    return DragSource;
}());
exports.DragSource = DragSource;
