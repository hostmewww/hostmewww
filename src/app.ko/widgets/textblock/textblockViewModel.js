"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TextblockViewModel = (function () {
    function TextblockViewModel(htmlEditor) {
        this.htmlEditor = htmlEditor;
        this.state = ko.observable();
    }
    TextblockViewModel.prototype.attachToModel = function (widgetModel) {
        var model = widgetModel.model;
        model.htmlEditor = this.htmlEditor;
        this.state(model.state);
    };
    return TextblockViewModel;
}());
exports.TextblockViewModel = TextblockViewModel;
