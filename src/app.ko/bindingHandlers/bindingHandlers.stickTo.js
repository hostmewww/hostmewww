"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
ko.bindingHandlers["stickTo"] = {
    init: function (element, valueAccessor) {
        var config = valueAccessor();
        var updatePosition = function () {
            if (!config.target) {
                return;
            }
            var rect = config.target.getBoundingClientRect();
            var placement = config.placement || "border";
            var coordX;
            var coordY;
            coordX = rect.left + Math.floor((rect.width) / 2) - Math.floor(element.clientWidth / 2);
            coordY = rect.top + Math.floor((rect.height) / 2) - Math.floor(element.clientHeight / 2);
            if (config.position.indexOf("top") >= 0) {
                coordY = rect.top;
                if (placement === "border") {
                    coordY = coordY - Math.floor(element.clientHeight / 2);
                }
            }
            if (config.position.indexOf("bottom") >= 0) {
                coordY = rect.top + rect.height - element.clientHeight;
                if (placement === "border") {
                    coordY = coordY + Math.floor(element.clientHeight / 2);
                }
            }
            if (config.position.indexOf("left") >= 0) {
                coordX = rect.left;
            }
            if (config.position.indexOf("right") >= 0) {
                coordX = rect.left + rect.width - element.clientWidth;
            }
            element.style.left = coordX + "px";
            element.style.top = coordY + "px";
        };
        updatePosition();
        document.addEventListener("scroll", updatePosition);
    }
};
