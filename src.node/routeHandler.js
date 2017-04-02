"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SaticRouteHandler = (function () {
    function SaticRouteHandler() {
        this.currentUrl = "/";
        this.navigateTo = this.navigateTo.bind(this);
        this.getCurrentPageUrl = this.getCurrentPageUrl.bind(this);
        this.callbacks = [];
    }
    SaticRouteHandler.prototype.addRouteChangeListener = function (callback) {
        this.callbacks.push(callback);
    };
    SaticRouteHandler.prototype.removeRouteChangeListener = function (callback) {
    };
    SaticRouteHandler.prototype.navigateTo = function (hash, notifyListeners, forceNotification) {
        if (notifyListeners === void 0) { notifyListeners = true; }
        this.currentUrl = hash;
        this.callbacks.forEach(function (callback) {
            callback();
        });
    };
    SaticRouteHandler.prototype.getCurrentPageUrl = function () {
        return this.currentUrl;
    };
    return SaticRouteHandler;
}());
exports.SaticRouteHandler = SaticRouteHandler;
