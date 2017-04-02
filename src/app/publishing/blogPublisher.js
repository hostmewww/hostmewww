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
var BlogPublisher = (function () {
    function BlogPublisher(pageModelBinder, layoutModelBinder, routeHandler, blogService, permalinkService, siteService, outputBlobStorage) {
        this.blogPostModelBinder = pageModelBinder;
        this.layoutModelBinder = layoutModelBinder;
        this.routeHandler = routeHandler;
        this.blogPostService = blogService;
        this.permalinkService = permalinkService;
        this.siteService = siteService;
        this.outputBlobStorage = outputBlobStorage;
        this.publish = this.publish.bind(this);
        this.renderBlogPost = this.renderBlogPost.bind(this);
    }
    BlogPublisher.prototype.renderBlogPost = function (blogPost) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var documentModel, siteSettingsPromise, resourceUri, htmlContent, buildContentPromise, arrayOfBytes, i, j, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Publishing blog post " + blogPost.title + "...");
                        documentModel = {
                            siteSettings: null,
                            pageModel: blogPost,
                            pageContentModel: {},
                            layoutContentModel: {},
                            permalink: null
                        };
                        siteSettingsPromise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                            var settings;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.siteService.getSiteSettings()];
                                    case 1:
                                        settings = _a.sent();
                                        documentModel.siteSettings = settings;
                                        resolve();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        buildContentPromise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                            var permalink;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.permalinkService.getPermalinkByKey(blogPost.permalinkKey)];
                                    case 1:
                                        permalink = _a.sent();
                                        documentModel.permalink = permalink;
                                        resourceUri = permalink.uri;
                                        this.routeHandler.navigateTo(resourceUri);
                                        setTimeout(function () {
                                            htmlContent = document.documentElement.outerHTML;
                                            resolve();
                                        }, 3000);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all([siteSettingsPromise, buildContentPromise])];
                    case 1:
                        _a.sent();
                        arrayOfBytes = [];
                        for (i = 0, j = htmlContent.length; i < j; ++i) {
                            arrayOfBytes.push(htmlContent.charCodeAt(i));
                        }
                        result = new Uint8Array(arrayOfBytes);
                        if (!resourceUri || resourceUri === "/blog") {
                            resourceUri = "blog/index.html";
                        }
                        else {
                            if (!resourceUri.substr((~-resourceUri.lastIndexOf(".") >>> 0) + 2)) {
                                resourceUri = "/" + resourceUri + "/index.html";
                            }
                        }
                        return [2 /*return*/, { name: resourceUri, result: result }];
                }
            });
        });
    };
    BlogPublisher.prototype.publish = function () {
        return __awaiter(this, void 0, void 0, function () {
            var blogPosts, results, i, page;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.blogPostService.search("")];
                    case 1:
                        blogPosts = _a.sent();
                        results = [];
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < blogPosts.length)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.renderBlogPost(blogPosts[i])];
                    case 3:
                        page = _a.sent();
                        results.push(this.outputBlobStorage.uploadBlob(page.name, page.result));
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [4 /*yield*/, Promise.all(results)];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return BlogPublisher;
}());
exports.BlogPublisher = BlogPublisher;
