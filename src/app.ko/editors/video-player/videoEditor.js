"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VideoEditor = (function () {
    function VideoEditor(viewManager) {
        this.viewManager = viewManager;
        this.onSourceUrlUpdate = this.onSourceUrlUpdate.bind(this);
        this.onControlsUpdate = this.onControlsUpdate.bind(this);
        this.onAutoplayUpdate = this.onAutoplayUpdate.bind(this);
        this.uploadMedia = this.uploadMedia.bind(this);
        this.onMediaUploaded = this.onMediaUploaded.bind(this);
        this.closeEditor = this.closeEditor.bind(this);
        this.sourceUrl = ko.observable();
        this.sourceUrl.subscribe(this.onSourceUrlUpdate);
        this.controls = ko.observable(true);
        this.controls.subscribe(this.onControlsUpdate);
        this.autoplay = ko.observable(false);
        this.autoplay.subscribe(this.onAutoplayUpdate);
        this.video = ko.observable();
    }
    VideoEditor.prototype.onControlsUpdate = function (controls) {
        this.video().controls(controls ? true : null);
    };
    VideoEditor.prototype.onAutoplayUpdate = function (autoplay) {
        this.video().autoplay(autoplay ? true : null);
    };
    VideoEditor.prototype.onSourceUrlUpdate = function (sourceUrl) {
        this.video().sourceUrl(sourceUrl);
    };
    VideoEditor.prototype.setWidgetModel = function (video) {
        this.video(video);
        this.sourceUrl(video.sourceUrl());
        this.controls(video.controls());
        this.autoplay(video.autoplay());
    };
    VideoEditor.prototype.uploadMedia = function () {
    };
    VideoEditor.prototype.onMediaUploaded = function (media) {
    };
    VideoEditor.prototype.closeEditor = function () {
        this.viewManager.closeWidgetEditor();
    };
    return VideoEditor;
}());
exports.VideoEditor = VideoEditor;
