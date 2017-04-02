"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PageItem = (function () {
    function PageItem(page) {
        this.contentKey = page.contentKey;
        this.permalinkKey = page.permalinkKey;
        this.key = page.key;
        this.permalinkUrl = ko.observable();
        this.title = ko.observable(page.title);
        this.description = ko.observable(page.description);
        this.keywords = ko.observable(page.keywords);
        this.hasFocus = ko.observable(false);
    }
    PageItem.prototype.toPage = function () {
        return {
            key: this.key,
            title: this.title(),
            description: this.description(),
            keywords: this.keywords(),
            contentKey: this.contentKey,
            permalinkKey: this.permalinkKey
        };
    };
    return PageItem;
}());
exports.PageItem = PageItem;
