"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MapEditor = (function () {
    function MapEditor() {
        this.onLocationUpdate = this.onLocationUpdate.bind(this);
        this.onCaptionUpdate = this.onCaptionUpdate.bind(this);
        this.onLayoutUpdate = this.onLayoutUpdate.bind(this);
        this.onZoomControlUpdate = this.onZoomControlUpdate.bind(this);
        this.location = ko.observable();
        this.location.subscribe(this.onLocationUpdate);
        this.caption = ko.observable();
        this.caption.subscribe(this.onCaptionUpdate);
        this.zoomControl = ko.observable(false);
        this.zoomControl.subscribe(this.onZoomControlUpdate);
        this.layout = ko.observable();
        this.layout.subscribe(this.onLayoutUpdate);
    }
    MapEditor.prototype.onCaptionUpdate = function (caption) {
        this.map.caption = caption;
        this.applyChangesCallback();
    };
    MapEditor.prototype.onLayoutUpdate = function (layout) {
        this.map.layout = layout;
        this.applyChangesCallback();
    };
    MapEditor.prototype.onLocationUpdate = function (location) {
        this.map.location = location;
        this.applyChangesCallback();
    };
    MapEditor.prototype.onZoomControlUpdate = function (enabled) {
        if (enabled)
            this.map.zoomControl = "show";
        else
            this.map.zoomControl = "hide";
        this.applyChangesCallback();
    };
    MapEditor.prototype.setWidgetModel = function (map, applyChangesCallback) {
        this.map = map;
        this.applyChangesCallback = applyChangesCallback;
        this.location(map.location);
        this.caption(map.caption);
        this.layout(map.layout);
        this.zoomControl(this.map.zoomControl === "show");
    };
    return MapEditor;
}());
exports.MapEditor = MapEditor;
