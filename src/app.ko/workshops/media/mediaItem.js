"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MediaItem = (function () {
    function MediaItem(media) {
        this.media = media;
        this.hasFocus = ko.observable();
    }
    return MediaItem;
}());
exports.MediaItem = MediaItem;
