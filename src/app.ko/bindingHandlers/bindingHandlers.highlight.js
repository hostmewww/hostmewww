"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
ko.bindingHandlers["highlight"] = {
    init: function (element, valueAccessor) {
        var config = valueAccessor();
        element["highlightConfig"] = config;
        var updatePosition = function () {
            var currentConfig = element["highlightConfig"];
            if (!currentConfig || !currentConfig.element) {
                return;
            }
            var rect = currentConfig.element.getBoundingClientRect();
            element.style.left = rect.left + "px";
            element.style.top = rect.top + "px";
            element.style.width = rect.width + "px";
            element.style.height = rect.height + "px";
            element.style.borderColor = currentConfig.color;
        };
        element["highlightUpdate"] = updatePosition;
        updatePosition();
        document.addEventListener("scroll", updatePosition);
    },
    update: function (element, valueAccessor) {
        var config = valueAccessor();
        element["highlightConfig"] = ko.unwrap(config);
        element["highlightUpdate"]();
    }
};
