"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LayoutItem = (function () {
    function LayoutItem(layout) {
        this.contentKey = layout.contentKey;
        this.key = layout.key;
        this.title = ko.observable(layout.title);
        this.description = ko.observable(layout.description);
        this.uriTemplate = ko.observable(layout.uriTemplate);
        this.hasFocus = ko.observable(false);
    }
    LayoutItem.prototype.toLayout = function () {
        return {
            key: this.key,
            title: this.title(),
            description: this.description(),
            uriTemplate: this.uriTemplate(),
            contentKey: this.contentKey
        };
    };
    return LayoutItem;
}());
exports.LayoutItem = LayoutItem;
