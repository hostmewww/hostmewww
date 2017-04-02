"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SectionViewModel = (function () {
    function SectionViewModel() {
        var _this = this;
        this.rows = ko.observableArray();
        this.layout = ko.observable("container");
        this.backgroundType = ko.observable();
        this.backgroundPictureUrl = ko.observable();
        this.backgroundSize = ko.observable();
        this.backgroundPosition = ko.observable();
        this.backgroundColor = ko.observable();
        this.backgroundRepeat = ko.observable();
        this.css = ko.observable();
        this.snapTo = ko.observable();
        this.background = ko.computed(function () {
            var background = {
                color: _this.backgroundColor(),
            };
            if (_this.backgroundType() === "picture") {
                Object.assign(background, {
                    imageUrl: _this.backgroundPictureUrl(),
                    position: _this.backgroundPosition(),
                    size: _this.backgroundSize(),
                    repeat: _this.backgroundRepeat()
                });
            }
            return background;
        });
    }
    SectionViewModel.prototype.attachToModel = function (widgetModel) {
        var model = widgetModel.model;
        this.layout(model.layout);
        this.backgroundType(model.backgroundType);
        this.backgroundPictureUrl(model.backgroundPictureUrl);
        this.backgroundSize(model.backgroundSize);
        this.backgroundPosition(model.backgroundPosition);
        this.backgroundColor(model.backgroundColor);
        this.rows(widgetModel.children);
        var sectionClasses = [];
        if (model.padding === "with-padding") {
            sectionClasses.push("with-padding");
        }
        if (model.snap === "top") {
            this.snapTo("top");
        }
        else {
            this.snapTo(null);
        }
        this.css(sectionClasses.join(" "));
    };
    return SectionViewModel;
}());
exports.SectionViewModel = SectionViewModel;
