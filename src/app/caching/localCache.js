"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lruCache_1 = require("../caching/lruCache");
var LocalCache = (function () {
    function LocalCache() {
        this.lrucache = new lruCache_1.LruCache(10000);
    }
    LocalCache.prototype.getKeys = function () {
        var keys = new Array();
        for (var key in window.localStorage) {
            if (window.localStorage.hasOwnProperty(key)) {
                keys.push(key);
            }
        }
        var lrucacheKeys = this.lrucache.getKeys();
        for (var i = 0; i < lrucacheKeys.length; i++) {
            keys.push(lrucacheKeys[i]);
        }
        return keys;
    };
    LocalCache.prototype.setItem = function (key, value) {
        if (this.estimateSize(value) < 10240) {
            this.lrucache.setItem(key, value);
        }
        window.localStorage.setItem(key, JSON.stringify(value));
    };
    LocalCache.prototype.getItem = function (key) {
        var content = this.lrucache.getItem(key);
        return content ? content : JSON.parse(window.localStorage.getItem(key));
    };
    LocalCache.prototype.estimateSize = function (object) {
        var list = [];
        var stack = [object];
        var bytes = 0;
        while (stack.length) {
            var value = stack.pop();
            if (!value) {
                continue;
            }
            if (typeof value === 'boolean') {
                bytes += 4;
            }
            else if (typeof value === 'string') {
                bytes += value.length * 2;
            }
            else if (typeof value === 'number') {
                bytes += 8;
            }
            else if (typeof value === 'object' &&
                list.indexOf(value) === -1) {
                list.push(value);
                for (var i in value) {
                    if (value.hasOwnProperty(i)) {
                        stack.push(value[i]);
                    }
                }
            }
        }
        return bytes;
    };
    LocalCache.prototype.getOccupiedSpace = function () {
        return 0;
    };
    LocalCache.prototype.getRemainingSpace = function () {
        return 0;
    };
    LocalCache.prototype.addChangeListener = function (callback) {
    };
    LocalCache.prototype.removeItem = function (key) {
        this.lrucache.removeItem(key);
        window.localStorage.removeItem(key);
    };
    LocalCache.prototype.clear = function () {
        this.lrucache.clear();
        window.localStorage.clear();
    };
    return LocalCache;
}());
exports.LocalCache = LocalCache;
