"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VideoPlayerViewModel = (function () {
    function VideoPlayerViewModel() {
        this.sourceUrl = ko.observable();
        this.controls = ko.observable();
        this.autoplay = ko.observable();
    }
    VideoPlayerViewModel.prototype.attachToModel = function (model) {
        this.sourceUrl(model.sourceUrl);
        this.controls(model.controls);
        this.autoplay(model.autoplay);
    };
    return VideoPlayerViewModel;
}());
exports.VideoPlayerViewModel = VideoPlayerViewModel;
