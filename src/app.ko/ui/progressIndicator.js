"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProgressIndicator = (function () {
    function ProgressIndicator(title, content, progress) {
        if (progress === void 0) { progress = 0; }
        this.title = ko.observable(title);
        this.content = ko.observable(content);
        this.progress = ko.observable();
        this.progress.subscribe(this.onProgressUpdate.bind(this));
        this.complete = ko.observable(false);
        this.progress(progress);
    }
    ProgressIndicator.prototype.onProgressUpdate = function (progress) {
        this.complete(progress === 100);
    };
    return ProgressIndicator;
}());
exports.ProgressIndicator = ProgressIndicator;
