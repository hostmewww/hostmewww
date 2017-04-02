"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebaseObjectStorage_1 = require("../firebase/firebaseObjectStorage");
var firebaseBlobStorage_1 = require("../firebase/firebaseBlobStorage");
var firebaseService_1 = require("../firebase/firebaseService");
var offlineObjectStorage_1 = require("../persistence/offlineObjectStorage");
var FirebaseRegistration = (function () {
    function FirebaseRegistration(useCache) {
        this.useCache = useCache;
        this.register = this.register.bind(this);
    }
    FirebaseRegistration.prototype.register = function (injector) {
        var _this = this;
        injector.bindSingleton("firebaseService", firebaseService_1.FirebaseService);
        injector.bindSingleton("blobStorage", firebaseBlobStorage_1.FirebaseBlobStorage);
        injector.bindFactory("objectStorage", function (ctx) {
            var firebaseService = ctx.resolve("firebaseService");
            var objectStorage = new firebaseObjectStorage_1.FirebaseObjectStorage(firebaseService);
            var eventManager = ctx.resolve("eventManager");
            var viewManager = ctx.resolve("viewManager");
            if (_this.useCache) {
                return new offlineObjectStorage_1.OfflineObjectStorage(objectStorage, eventManager, viewManager);
            }
            return objectStorage;
        });
    };
    return FirebaseRegistration;
}());
exports.FirebaseRegistration = FirebaseRegistration;
