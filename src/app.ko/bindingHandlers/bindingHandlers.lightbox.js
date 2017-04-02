"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LightboxBindingHandler = (function () {
    function LightboxBindingHandler(lightbox) {
        ko.bindingHandlers["lightbox"] = {
            init: function (element, valueAccessor) {
                var configuration = valueAccessor();
                var lightboxContentUrl = ko.unwrap(configuration.url);
                var setContentUrl = function (url) {
                    lightboxContentUrl = url;
                };
                var showLightbox = function () {
                    lightbox.show(lightboxContentUrl);
                };
                if (ko.isObservable(configuration.url)) {
                    configuration.url.subscribe(setContentUrl);
                }
                ko.applyBindingsToNode(element, { click: showLightbox });
            }
        };
    }
    return LightboxBindingHandler;
}());
exports.LightboxBindingHandler = LightboxBindingHandler;
