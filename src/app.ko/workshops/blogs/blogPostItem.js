"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BlogPostItem = (function () {
    function BlogPostItem(blogPost) {
        this.contentKey = blogPost.contentKey;
        this.permalinkKey = blogPost.permalinkKey;
        this.key = blogPost.key;
        this.permalinkUrl = ko.observable();
        this.title = ko.observable(blogPost.title);
        this.description = ko.observable(blogPost.description);
        this.keywords = ko.observable(blogPost.keywords);
        this.hasFocus = ko.observable(false);
    }
    BlogPostItem.prototype.toBlogPost = function () {
        return {
            key: this.key,
            title: this.title(),
            description: this.description(),
            keywords: this.keywords(),
            contentKey: this.contentKey,
            permalinkKey: this.permalinkKey
        };
    };
    return BlogPostItem;
}());
exports.BlogPostItem = BlogPostItem;
