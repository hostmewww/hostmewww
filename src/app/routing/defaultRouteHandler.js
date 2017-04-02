"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RouteHandlerEvents = (function () {
    function RouteHandlerEvents() {
    }
    return RouteHandlerEvents;
}());
RouteHandlerEvents.onRouteChange = "onRouteChange";
exports.RouteHandlerEvents = RouteHandlerEvents;
var DefaultRouteHandler = (function () {
    function DefaultRouteHandler(eventManager) {
        this.eventManager = eventManager;
        this.handleHashChangeEvent = this.handleHashChangeEvent.bind(this);
        this.getCurrentPageUrl = this.getCurrentPageUrl.bind(this);
        this.hash = window.location.hash;
        this.notificationEnabled = true;
        window.addEventListener("hashchange", this.handleHashChangeEvent, false);
    }
    DefaultRouteHandler.prototype.handleHashChangeEvent = function () {
        this.hash = location.hash;
        if (this.notificationEnabled) {
            this.eventManager.dispatchEvent(RouteHandlerEvents.onRouteChange);
        }
    };
    DefaultRouteHandler.prototype.addRouteChangeListener = function (callback) {
        return this.eventManager.addEventListener(RouteHandlerEvents.onRouteChange, callback);
    };
    DefaultRouteHandler.prototype.removeRouteChangeListener = function (handle) {
        this.eventManager.removeEventListener(RouteHandlerEvents.onRouteChange, handle);
    };
    DefaultRouteHandler.prototype.navigateTo = function (hash, notifyListeners, forceNotification) {
        var _this = this;
        if (notifyListeners === void 0) { notifyListeners = true; }
        if (!notifyListeners) {
            this.notificationEnabled = false;
        }
        this.hash = hash;
        location.hash = hash;
        if (this.notificationEnabled && forceNotification) {
            this.eventManager.dispatchEvent(RouteHandlerEvents.onRouteChange);
        }
        setImmediate(function () {
            _this.notificationEnabled = true;
        });
    };
    DefaultRouteHandler.prototype.getCurrentPageUrl = function () {
        var permalink = this.hash.replace("#", "");
        if (permalink === "") {
            permalink = location.pathname;
        }
        return permalink;
    };
    return DefaultRouteHandler;
}());
exports.DefaultRouteHandler = DefaultRouteHandler;
