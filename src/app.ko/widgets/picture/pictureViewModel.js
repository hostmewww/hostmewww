"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DefaultSourceUrl = "http://placehold.it/800x600";
var PictureViewModel = (function () {
    function PictureViewModel() {
        var _this = this;
        this.sourceUrl = ko.observable(DefaultSourceUrl);
        this.caption = ko.observable("Picture");
        this.layout = ko.observable("noframe");
        this.animation = ko.observable("none");
        this.background = ko.computed(function () {
            var background = {
                imageUrl: _this.sourceUrl(),
            };
            return background;
        });
        this.css = ko.computed(function () {
            var classes = [];
            classes.push(_this.layout());
            return classes.join(" ");
        });
    }
    PictureViewModel.prototype.attachToModel = function (model) {
        this.caption(model.caption);
        this.layout(model.layout);
        this.animation(model.animation);
        this.sourceUrl(model.sourceUrl);
    };
    return PictureViewModel;
}());
exports.PictureViewModel = PictureViewModel;
