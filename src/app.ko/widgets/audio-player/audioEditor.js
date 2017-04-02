"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AudioEditor = (function () {
    function AudioEditor(viewManager) {
        this.viewManager = viewManager;
        this.onSourceUrlUpdate = this.onSourceUrlUpdate.bind(this);
        this.onControlsUpdate = this.onControlsUpdate.bind(this);
        this.onAutoplayUpdate = this.onAutoplayUpdate.bind(this);
        this.uploadMedia = this.uploadMedia.bind(this);
        this.onMediaUploaded = this.onMediaUploaded.bind(this);
        this.sourceUrl = ko.observable();
        this.sourceUrl.subscribe(this.onSourceUrlUpdate);
        this.controls = ko.observable(true);
        this.controls.subscribe(this.onControlsUpdate);
        this.autoplay = ko.observable(false);
        this.autoplay.subscribe(this.onAutoplayUpdate);
        this.audio = ko.observable();
    }
    AudioEditor.prototype.onControlsUpdate = function (controls) {
        this.audio().controls(controls ? true : null);
    };
    AudioEditor.prototype.onAutoplayUpdate = function (autoplay) {
        this.audio().autoplay(autoplay ? true : null);
    };
    AudioEditor.prototype.onSourceUrlUpdate = function (sourceUrl) {
        this.audio().sourceUrl(sourceUrl);
    };
    AudioEditor.prototype.setWidgetModel = function (audio) {
        this.audio(audio);
        this.sourceUrl(audio.sourceUrl());
        this.controls(audio.controls());
        this.autoplay(audio.autoplay());
    };
    AudioEditor.prototype.uploadMedia = function () {
    };
    AudioEditor.prototype.onMediaUploaded = function (media) {
    };
    return AudioEditor;
}());
exports.AudioEditor = AudioEditor;
