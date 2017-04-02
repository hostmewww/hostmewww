"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PagePlaceholderViewModel = (function () {
    function PagePlaceholderViewModel() {
        this.title = ko.observable();
        this.description = ko.observable();
    }
    PagePlaceholderViewModel.prototype.attachToModel = function (widgetModel) { };
    return PagePlaceholderViewModel;
}());
exports.PagePlaceholderViewModel = PagePlaceholderViewModel;
