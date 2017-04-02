"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ColumnViewModel = (function () {
    function ColumnViewModel() {
        var _this = this;
        this.widgets = ko.observableArray();
        this.sizeSm = ko.observable();
        this.sizeMd = ko.observable();
        this.sizeLg = ko.observable();
        this.alignmentSm = ko.observable();
        this.alignmentMd = ko.observable();
        this.alignmentLg = ko.observable();
        this.align = ko.observable();
        this.css = ko.computed(function () {
            var classes = [];
            if (_this.sizeSm()) {
                classes.push("col-sm-" + _this.sizeSm());
            }
            if (_this.sizeMd()) {
                classes.push("col-md-" + _this.sizeMd());
            }
            if (_this.sizeLg()) {
                classes.push("col-lg-" + _this.sizeLg());
            }
            if (_this.alignmentSm()) {
                classes.push(_this.getClass(_this.alignmentSm(), "sm"));
            }
            if (_this.alignmentMd()) {
                classes.push(_this.getClass(_this.alignmentMd(), "md"));
            }
            if (_this.alignmentLg()) {
                classes.push(_this.getClass(_this.alignmentLg(), "lg"));
            }
            return classes.join(" ");
        });
    }
    ColumnViewModel.prototype.getClass = function (alignmentString, targetSize) {
        var alignment = this.alignmentSm().split(" ");
        return alignment[0] + "-" + targetSize + " " + alignment[1] + "-" + targetSize;
    };
    ColumnViewModel.prototype.attachToModel = function (widgetModel) {
        var model = widgetModel.model;
        this.sizeSm(model.sizeSm);
        this.sizeMd(model.sizeMd);
        this.sizeLg(model.sizeLg);
        if (model.alignmentSm) {
            this.alignmentSm(model.alignmentSm);
        }
        else {
            this.alignmentSm("middle center");
        }
        if (model.alignmentMd) {
            this.alignmentMd(model.alignmentMd);
        }
        else {
            this.alignmentMd("middle center");
        }
        if (model.alignmentLg) {
            this.alignmentLg(model.alignmentMd);
        }
        else {
            this.alignmentLg("middle center");
        }
        this.widgets(widgetModel.children);
    };
    return ColumnViewModel;
}());
exports.ColumnViewModel = ColumnViewModel;
