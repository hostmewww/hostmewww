"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StaticSettingsProvider = (function () {
    function StaticSettingsProvider() {
        this.configuration = {
            "firebase": {
                "apiKey": "AIzaSyC3ele01iE9B32yJ_6OjVSnsZCz18EVddE",
                "authDomain": "vienna.firebaseapp.com",
                "databaseURL": "https://vienna.firebaseio.com",
                "storageBucket": "project-5562312728052499011.appspot.com"
            }
        };
    }
    StaticSettingsProvider.prototype.getSetting = function (name) {
        return Promise.resolve(this.configuration[name]);
    };
    StaticSettingsProvider.prototype.setSetting = function (name, value) {
        this.configuration[name] = value;
    };
    StaticSettingsProvider.prototype.getSettings = function () {
        return Promise.resolve(this.configuration);
    };
    StaticSettingsProvider.prototype.onSettingChange = function (name, eventHandler) {
    };
    return StaticSettingsProvider;
}());
exports.StaticSettingsProvider = StaticSettingsProvider;
