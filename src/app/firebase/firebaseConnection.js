"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FirebaseConnection = (function () {
    function FirebaseConnection(firebaseService, eventManager) {
        var _this = this;
        this.firebaseService = firebaseService;
        this.eventManager = eventManager;
        var connectedRef = firebase.database().ref(".info/connected");
        connectedRef.on("value", function (snapshot) {
            if (snapshot.val() === true) {
                _this.eventManager.dispatchEvent("onOnlineStatusChanged", "online");
            }
            else {
                _this.eventManager.dispatchEvent("onOnlineStatusChanged", "offline");
            }
        });
    }
    return FirebaseConnection;
}());
exports.FirebaseConnection = FirebaseConnection;
