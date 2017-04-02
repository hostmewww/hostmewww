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
var Utils = require("../core/utils");
var blogPostsPath = "posts";
var BlogService = (function () {
    function BlogService(objectStorage) {
        this.objectStorage = objectStorage;
    }
    BlogService.prototype.searchByTags = function (tags, tagValue, startAtSearch) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.objectStorage.searchObjects(blogPostsPath, tags, tagValue, startAtSearch)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BlogService.prototype.getBlogPostByKey = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.objectStorage.getObject(key)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BlogService.prototype.search = function (pattern) {
        return this.searchByTags(["title"], pattern, true);
    };
    BlogService.prototype.deleteBlogPost = function (blogPost) {
        return __awaiter(this, void 0, void 0, function () {
            var deleteContentPromise, deletePermalinkPromise, deleteBlogPostPromise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        deleteContentPromise = this.objectStorage.deleteObject(blogPost.contentKey);
                        deletePermalinkPromise = this.objectStorage.deleteObject(blogPost.permalinkKey);
                        deleteBlogPostPromise = this.objectStorage.deleteObject(blogPost.key);
                        return [4 /*yield*/, Promise.all([deleteContentPromise, deletePermalinkPromise, deleteBlogPostPromise])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BlogService.prototype.createBlogPost = function (title, description, keywords) {
        return __awaiter(this, void 0, void 0, function () {
            var blogPostId, blogPost;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        blogPostId = blogPostsPath + "/" + Utils.guid();
                        blogPost = {
                            key: blogPostId,
                            title: title,
                            description: description,
                            keywords: keywords,
                        };
                        return [4 /*yield*/, this.objectStorage.addObject(blogPostId, blogPost)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, blogPost];
                }
            });
        });
    };
    BlogService.prototype.updateBlogPost = function (blogPost) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.objectStorage.updateObject(blogPost.key, blogPost)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return BlogService;
}());
exports.BlogService = BlogService;
