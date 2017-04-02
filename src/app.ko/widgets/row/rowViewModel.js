"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RowViewModel = (function () {
    function RowViewModel() {
        var _this = this;
        this.columns = ko.observableArray();
        this.alignSm = ko.observable();
        this.alignMd = ko.observable();
        this.alignLg = ko.observable();
        this.justifySm = ko.observable();
        this.justifyMd = ko.observable();
        this.justifyLg = ko.observable();
        this.css = ko.computed(function () {
            var css = "";
            if (_this.alignSm()) {
                css += " " + _this.alignSm() + "-sm";
            }
            if (_this.alignMd()) {
                css += " " + _this.alignMd() + "-md";
            }
            if (_this.alignLg()) {
                css += " " + _this.alignLg() + "-lg";
            }
            if (_this.justifySm()) {
                css += " " + _this.justifySm() + "-sm";
            }
            if (_this.justifyMd()) {
                css += " " + _this.justifyMd() + "-md";
            }
            if (_this.justifyLg()) {
                css += " " + _this.justifyLg() + "-lg";
            }
            return css;
        });
    }
    RowViewModel.prototype.attachToModel = function (widgetModel) {
        var model = widgetModel.model;
        this.alignSm(model.alignSm);
        this.alignMd(model.alignMd);
        this.alignLg(model.alignLg);
        this.justifySm(model.justifySm);
        this.justifyMd(model.justifyMd);
        this.justifyLg(model.justifyLg);
        this.columns(widgetModel.children);
    };
    return RowViewModel;
}());
exports.RowViewModel = RowViewModel;
