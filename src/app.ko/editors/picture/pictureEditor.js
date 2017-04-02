"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PictureEditor = (function () {
    function PictureEditor() {
        var _this = this;
        this.onSourceUrlUpdate = this.onSourceUrlUpdate.bind(this);
        this.onCaptionUpdate = this.onCaptionUpdate.bind(this);
        this.onLayoutUpdate = this.onLayoutUpdate.bind(this);
        this.onAnimationUpdate = this.onAnimationUpdate.bind(this);
        this.onMediaSelected = this.onMediaSelected.bind(this);
        this.sourceUrl = ko.observable();
        this.sourceUrl.subscribe(this.onSourceUrlUpdate);
        this.caption = ko.observable();
        this.caption.subscribe(this.onCaptionUpdate);
        this.action = ko.observable();
        this.layout = ko.observable();
        this.layout.subscribe(this.onLayoutUpdate);
        this.animation = ko.observable();
        this.animation.subscribe(this.onAnimationUpdate);
        this.background = ko.computed(function () {
            return {
                imageUrl: _this.sourceUrl(),
            };
        });
    }
    PictureEditor.prototype.onCaptionUpdate = function (caption) {
        this.picture.caption = caption;
        this.applyChangesCallback();
    };
    PictureEditor.prototype.onLayoutUpdate = function (layout) {
        this.picture.layout = layout;
        this.applyChangesCallback();
    };
    PictureEditor.prototype.onAnimationUpdate = function (layout) {
        this.picture.animation = layout;
        this.applyChangesCallback();
    };
    PictureEditor.prototype.onSourceUrlUpdate = function (sourceUrl) {
        this.picture.sourceUrl = sourceUrl;
        this.applyChangesCallback();
    };
    PictureEditor.prototype.setWidgetModel = function (picture, applyChangesCallback) {
        this.picture = picture;
        this.applyChangesCallback = applyChangesCallback;
        this.sourceUrl(picture.sourceUrl);
        this.caption(picture.caption);
        this.layout(picture.layout);
        this.animation(picture.animation);
    };
    PictureEditor.prototype.onMediaSelected = function (media) {
        this.picture.sourceKey = media.permalinkKey;
        this.sourceUrl(media.downloadUrl);
        this.applyChangesCallback();
    };
    return PictureEditor;
}());
exports.PictureEditor = PictureEditor;
