"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MediaHandlers = (function () {
    function MediaHandlers(mediaTypePrefixes, fileExtensions) {
        this.mediaTypePrefixes = mediaTypePrefixes;
        this.fileExtensions = fileExtensions;
    }
    MediaHandlers.prototype.matches = function (dataTransfer) {
        if (dataTransfer.mimeType && !this.mediaTypePrefixes.any(function (m) { return dataTransfer.mimeType.startsWith(m); })) {
            return false;
        }
        if (dataTransfer.name && !this.fileExtensions.any(function (e) { return dataTransfer.name.endsWith(e); })) {
            return false;
        }
        return true;
    };
    MediaHandlers.prototype.getContentDescriptorFromDataTransfer = function (item) {
        return null;
    };
    return MediaHandlers;
}());
exports.MediaHandlers = MediaHandlers;
