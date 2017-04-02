"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PageViewModel = (function () {
    function PageViewModel() {
        this.title = ko.observable();
        this.description = ko.observable();
        this.keywords = ko.observable();
        this.sections = ko.observableArray();
    }
    PageViewModel.prototype.attachToModel = function (widgetModel) {
        var model = widgetModel.model;
        this.title(model.title);
        this.description(model.description);
        this.keywords(model.keywords);
        this.sections(widgetModel.children);
    };
    return PageViewModel;
}());
exports.PageViewModel = PageViewModel;
