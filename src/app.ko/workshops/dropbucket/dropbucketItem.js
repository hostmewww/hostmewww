"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DropBucketItem = (function () {
    function DropBucketItem() {
        var _this = this;
        this.title = null;
        this.description = null;
        this.previewUrl = ko.observable();
        this.thumbnailUrl = ko.observable();
        this.uploadables = ko.observableArray();
        this.widgetOrder = ko.observable();
        this.background = ko.computed(function () {
            return {
                imageUrl: _this.thumbnailUrl()
            };
        });
    }
    return DropBucketItem;
}());
exports.DropBucketItem = DropBucketItem;
