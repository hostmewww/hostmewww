"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MapViewModel = (function () {
    function MapViewModel() {
        this.location = ko.observable("Seattle, WA");
        this.caption = ko.observable("Seattle, WA");
        this.layout = ko.observable();
        this.zoomControl = ko.observable("hide");
    }
    MapViewModel.prototype.attachToModel = function (model) {
        this.caption(model.caption);
        this.layout(model.layout);
        this.location(model.location);
        this.zoomControl(model.zoomControl);
    };
    return MapViewModel;
}());
exports.MapViewModel = MapViewModel;
