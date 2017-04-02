"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NewsElementItem = (function () {
    function NewsElementItem(newsElement) {
        this.contentKey = newsElement.contentKey;
        this.permalinkKey = newsElement.permalinkKey;
        this.key = newsElement.key;
        this.permalinkUrl = ko.observable();
        this.title = ko.observable(newsElement.title);
        this.description = ko.observable(newsElement.description);
        this.keywords = ko.observable(newsElement.keywords);
        this.hasFocus = ko.observable(false);
    }
    NewsElementItem.prototype.toNewsElement = function () {
        return {
            key: this.key,
            title: this.title(),
            description: this.description(),
            keywords: this.keywords(),
            contentKey: this.contentKey,
            permalinkKey: this.permalinkKey
        };
    };
    return NewsElementItem;
}());
exports.NewsElementItem = NewsElementItem;
