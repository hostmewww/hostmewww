"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
ko.bindingHandlers["columnSize"] = {
    init: function (element, valueAccessor) {
        var size = valueAccessor();
        var css = {};
        css["col-cfg-" + size] = true;
        ko.applyBindingsToNode(element, { css: css });
    }
};
