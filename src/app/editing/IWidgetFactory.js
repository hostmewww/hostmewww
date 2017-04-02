"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KnockoutWidgetFactory = (function () {
    function KnockoutWidgetFactory() {
    }
    KnockoutWidgetFactory.prototype.getWidgetInstance = function (widgetComponentName, model) {
        var htmlElement = document.createElement(widgetComponentName);
        ko.applyBindingsToNode(htmlElement, {});
        return Promise.resolve(htmlElement);
    };
    return KnockoutWidgetFactory;
}());
exports.KnockoutWidgetFactory = KnockoutWidgetFactory;
