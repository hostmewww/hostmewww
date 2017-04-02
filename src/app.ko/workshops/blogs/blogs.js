"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var blogPostItem_1 = require("../../../app.ko/workshops/blogs/blogPostItem");
var DeleteKeyCode = 46;
var BlogWorkshop = (function () {
    function BlogWorkshop(blogService, fileService, permalinkService, routeHandler, viewManager) {
        this.blogService = blogService;
        this.fileService = fileService;
        this.permalinkService = permalinkService;
        this.routeHandler = routeHandler;
        this.viewManager = viewManager;
        this.searchBlogPosts = this.searchBlogPosts.bind(this);
        this.addBlogPost = this.addBlogPost.bind(this);
        this.selectBlogPost = this.selectBlogPost.bind(this);
        this.keydown = this.keydown.bind(this);
        this.working = ko.observable(true);
        this.blogPosts = ko.observableArray();
        this.selectedBlogPost = ko.observable();
        this.searchPattern = ko.observable();
        this.searchPattern.subscribe(this.searchBlogPosts);
        this.searchBlogPosts("");
        this.init();
    }
    BlogWorkshop.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.template = {
                    "kind": "block",
                    "nodes": [
                        {
                            "kind": "block",
                            "nodes": [
                                {
                                    "align": {
                                        "md": "center"
                                    },
                                    "kind": "block",
                                    "nodes": [
                                        {
                                            "kind": "block",
                                            "nodes": [
                                                {
                                                    "kind": "widget",
                                                    "nodes": [
                                                        {
                                                            "kind": "block",
                                                            "nodes": [
                                                                {
                                                                    "kind": "text",
                                                                    "text": "New blog post"
                                                                }
                                                            ],
                                                            "type": "paragraph"
                                                        }
                                                    ],
                                                    "type": "text"
                                                }
                                            ],
                                            "size": {
                                                "md": 12
                                            },
                                            "type": "layout-column"
                                        }
                                    ],
                                    "type": "layout-row"
                                }
                            ],
                            "type": "layout-section"
                        }
                    ],
                    "type": "blogPost"
                };
                return [2 /*return*/];
            });
        });
    };
    BlogWorkshop.prototype.searchBlogPosts = function (searchPattern) {
        return __awaiter(this, void 0, void 0, function () {
            var blogposts, blogpostItems;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.working(true);
                        return [4 /*yield*/, this.blogService.search(searchPattern)];
                    case 1:
                        blogposts = _a.sent();
                        blogpostItems = blogposts.map(function (blogPost) { return new blogPostItem_1.BlogPostItem(blogPost); });
                        this.blogPosts(blogpostItems);
                        this.working(false);
                        return [2 /*return*/];
                }
            });
        });
    };
    BlogWorkshop.prototype.selectBlogPost = function (blogpost) {
        this.selectedBlogPost(blogpost);
        this.viewManager.openWorkshop("blog-post-details-workshop", blogpost);
    };
    BlogWorkshop.prototype.addBlogPost = function () {
        return __awaiter(this, void 0, void 0, function () {
            var blogpost, createPermalinkPromise, createContentPromise, results, permalink, content, blogpostItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.working(true);
                        return [4 /*yield*/, this.blogService.createBlogPost("New blog post", "", "")];
                    case 1:
                        blogpost = _a.sent();
                        createPermalinkPromise = this.permalinkService.createPermalink("/blog/new", blogpost.key);
                        createContentPromise = this.fileService.createFile(this.template);
                        return [4 /*yield*/, Promise.all([createPermalinkPromise, createContentPromise])];
                    case 2:
                        results = _a.sent();
                        permalink = results[0];
                        content = results[1];
                        blogpost.permalinkKey = permalink.key;
                        blogpost.contentKey = content.key;
                        return [4 /*yield*/, this.blogService.updateBlogPost(blogpost)];
                    case 3:
                        _a.sent();
                        blogpostItem = new blogPostItem_1.BlogPostItem(blogpost);
                        this.blogPosts.push(blogpostItem);
                        this.selectBlogPost(blogpostItem);
                        this.working(false);
                        return [2 /*return*/];
                }
            });
        });
    };
    BlogWorkshop.prototype.deleteSelectedBlogPost = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.blogService.deleteBlogPost(this.selectedBlogPost().toBlogPost())];
                    case 1:
                        _a.sent();
                        this.routeHandler.navigateTo("/");
                        this.viewManager.closeWorkshop("blog-post-details-workshop");
                        this.viewManager.openWorkshop("blogs");
                        return [2 /*return*/];
                }
            });
        });
    };
    BlogWorkshop.prototype.keydown = function (item, event) {
        if (event.keyCode === DeleteKeyCode) {
            this.deleteSelectedBlogPost();
        }
    };
    return BlogWorkshop;
}());
exports.BlogWorkshop = BlogWorkshop;
