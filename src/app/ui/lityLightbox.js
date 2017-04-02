"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LityLightbox = (function () {
    function LityLightbox() {
        this.lightbox = lity();
    }
    LityLightbox.prototype.show = function (url) {
        this.lightbox(url);
    };
    return LityLightbox;
}());
exports.LityLightbox = LityLightbox;
