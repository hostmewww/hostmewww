"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LayoutViewModel = (function () {
    function LayoutViewModel() {
        this.widgets = ko.observableArray();
        this.title = ko.observable();
        this.description = ko.observable();
        this.uriTemplate = ko.observable();
    }
    LayoutViewModel.prototype.attachToModel = function (widgetModel) {
        var model = widgetModel.model;
        this.title(model.title);
        this.description(model.description);
        this.uriTemplate(model.uriTemplate);
        this.widgets(widgetModel.children);
    };
    return LayoutViewModel;
}());
exports.LayoutViewModel = LayoutViewModel;
