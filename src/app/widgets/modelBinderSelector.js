"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ModelBinderSelector = (function () {
    function ModelBinderSelector(editors) {
        this.editors = editors;
    }
    ModelBinderSelector.prototype.getModelBinderByNodeType = function (widgetType) {
        return this.editors.find(function (x) { return x.canHandleWidgetType(widgetType); });
    };
    ModelBinderSelector.prototype.getModelBinderByModel = function (model) {
        return this.editors.find(function (x) { return x.canHandleWidgetModel(model); });
    };
    return ModelBinderSelector;
}());
exports.ModelBinderSelector = ModelBinderSelector;
