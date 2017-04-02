"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DefaultEventManager = (function () {
    function DefaultEventManager() {
        this.addEventListener = this.addEventListener.bind(this);
        this.dispatchEvent = this.dispatchEvent.bind(this);
    }
    DefaultEventManager.prototype.addEventListener = function (eventName, callback) {
        var handler = function (customEvent) { return callback(customEvent.detail); };
        document.addEventListener(eventName, handler);
        return handler;
    };
    DefaultEventManager.prototype.removeEventListener = function (eventName, handle) {
        document.removeEventListener(eventName, handle);
    };
    DefaultEventManager.prototype.dispatchEvent = function (eventName, args) {
        var customEvent = document.createEvent("CustomEvent");
        customEvent.initCustomEvent(eventName, true, true, args);
        document.dispatchEvent(customEvent);
    };
    return DefaultEventManager;
}());
exports.DefaultEventManager = DefaultEventManager;
