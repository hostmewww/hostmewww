"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProgressPromise = (function () {
    function ProgressPromise(callback) {
        var _this = this;
        this.progressCallbacks = [];
        this.inner = new Promise(function (resolve, reject) { return callback(resolve, reject, _this._progress.bind(_this)); });
    }
    ProgressPromise.prototype.progress = function (callback) {
        this.progressCallbacks.push(callback);
        return this;
    };
    ProgressPromise.prototype._progress = function (percent) {
        this.progressCallbacks.forEach(function (callback) { return callback(percent); });
    };
    ProgressPromise.prototype.then = function (onFulfilled, onRejected, progress) {
        if (progress) {
            this.progress(progress);
        }
        return this.inner.then(onFulfilled, onRejected);
    };
    ProgressPromise.prototype.catch = function (onRejected) {
        return this.inner.catch(onRejected);
    };
    ProgressPromise.prototype.sequence = function (next) {
        var _this = this;
        return new ProgressPromise(function (resolve, reject, progress) {
            _this.then(function (value) { return next(value).then(resolve, reject, function (percent) { return progress(50 + percent / 2); }); }, reject, function (percent) { return progress(percent / 2); });
        });
    };
    return ProgressPromise;
}());
exports.ProgressPromise = ProgressPromise;
