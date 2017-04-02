"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AudioPlayerViewModel = (function () {
    function AudioPlayerViewModel() {
        this.sourceUrl = ko.observable();
        this.sourceKey = ko.observable();
        this.controls = ko.observable();
        this.autoplay = ko.observable();
    }
    AudioPlayerViewModel.prototype.attachToModel = function (model) {
        this.sourceUrl(model.sourceUrl);
        this.sourceKey(model.sourceKey);
        this.controls(model.controls);
        this.autoplay(model.autoplay);
    };
    return AudioPlayerViewModel;
}());
exports.AudioPlayerViewModel = AudioPlayerViewModel;
