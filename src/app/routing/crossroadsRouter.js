"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crossroads = require("crossroads");
var hasher = require("hasher");
var CrossroadsRouter = (function () {
    function CrossroadsRouter() {
        this.parseHash = this.parseHash.bind(this);
    }
    CrossroadsRouter.prototype.parseHash = function (newHash, oldHash) {
        crossroads.parse(newHash);
    };
    CrossroadsRouter.prototype.addRoute = function (pattern, handler, priority) {
        crossroads.addRoute(pattern, handler, priority);
    };
    CrossroadsRouter.prototype.startListening = function () {
        hasher.initialized.add(this.parseHash);
        hasher.changed.add(this.parseHash);
        hasher.init();
    };
    return CrossroadsRouter;
}());
exports.CrossroadsRouter = CrossroadsRouter;
