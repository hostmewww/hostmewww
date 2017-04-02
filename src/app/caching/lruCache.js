"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LruCache = (function () {
    function LruCache(maxSize, onevict) {
        if (maxSize === void 0) { maxSize = 10000; }
        this.maxSize = maxSize;
        this.onevict = onevict;
        this.nodeMap = {};
    }
    LruCache.prototype.getItem = function (key) {
        var item = this.nodeMap[key];
        if (!item) {
            return null;
        }
        this.pop(item);
        return item.value;
    };
    LruCache.prototype.setItem = function (key, value) {
        var item = this.nodeMap[key];
        if (item) {
            item.value = value;
            this.pop(item);
        }
        else {
            this.insert(key, value);
        }
    };
    LruCache.prototype.clear = function () {
        this.head = null;
        this.nodeMap = {};
    };
    LruCache.prototype.removeItem = function (key) {
        var item = this.nodeMap[key];
        this.remove(item);
    };
    LruCache.prototype.removeWhere = function (predicate) {
        var item = this.head;
        if (!item) {
            return;
        }
        do {
            if (predicate(item.key, item.value)) {
                this.removeItem(item.key);
            }
        } while ((item = item.next) != null);
    };
    LruCache.prototype.getKeys = function () {
        var result = new Array();
        var item = this.head;
        if (!item) {
            return result;
        }
        do {
            result.push(item.key);
        } while ((item = item.next) != null);
        return result;
    };
    LruCache.prototype.size = function () {
        return Object.keys(this.nodeMap).length;
    };
    LruCache.prototype.pop = function (item) {
        if (item === this.head) {
            return;
        }
        item.prev.next = item.next;
        if (item.next) {
            item.next.prev = item.prev;
        }
        else {
            this.tail = item.prev;
        }
        item.next = this.head;
        this.head.prev = item;
        item.prev = null;
        this.head = item;
    };
    LruCache.prototype.insert = function (key, value) {
        if (Object.keys(this.nodeMap).length === this.maxSize) {
            var tail = this.tail;
            this.remove(tail);
            this.onevict(tail.key, tail.value);
        }
        if (!this.head) {
            this.head = {
                key: key,
                value: value,
                prev: null,
                next: null
            };
            this.tail = this.head;
        }
        else {
            this.head = {
                key: key,
                value: value,
                prev: null,
                next: this.head
            };
            this.head.next.prev = this.head;
        }
        this.nodeMap[key] = this.head;
    };
    LruCache.prototype.remove = function (item) {
        if (!item) {
            return;
        }
        delete this.nodeMap[item.key];
        if (!this.head) {
            return;
        }
        if (this.head === item) {
            this.head = item.next;
            this.head.prev = null;
            return;
        }
        if (this.tail === item) {
            this.tail = this.tail.prev;
            this.tail.next = null;
            return;
        }
        item.prev.next = item.next;
        item.next.prev = item.prev;
    };
    return LruCache;
}());
exports.LruCache = LruCache;
