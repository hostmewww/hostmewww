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
var BlogPostDetailsWorkshop = (function () {
    function BlogPostDetailsWorkshop(blogService, permalinkService, routeHandler, blogPostItem, viewManager) {
        this.blogService = blogService;
        this.permalinkService = permalinkService;
        this.routeHandler = routeHandler;
        this.viewManager = viewManager;
        this.blogPostItem = blogPostItem;
        this.deleteBlogPost = this.deleteBlogPost.bind(this);
        this.updateMetadata = this.updateMetadata.bind(this);
        this.updatePermalink = this.updatePermalink.bind(this);
        this.init();
    }
    BlogPostDetailsWorkshop.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var permalink;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.permalinkService.getPermalinkByKey(this.blogPostItem.permalinkKey)];
                    case 1:
                        permalink = _a.sent();
                        this.blogPostPermalink = permalink;
                        this.blogPostItem.permalinkUrl(permalink.uri);
                        this.routeHandler.navigateTo(permalink.uri);
                        this.blogPostItem.title.subscribe(this.updateMetadata);
                        this.blogPostItem.description.subscribe(this.updateMetadata);
                        this.blogPostItem.keywords.subscribe(this.updateMetadata);
                        this.blogPostItem.permalinkUrl.subscribe(this.updatePermalink);
                        return [2 /*return*/];
                }
            });
        });
    };
    BlogPostDetailsWorkshop.prototype.updateMetadata = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.blogService.updateBlogPost(this.blogPostItem.toBlogPost())];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BlogPostDetailsWorkshop.prototype.updatePermalink = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.blogPostPermalink.uri = this.blogPostItem.permalinkUrl();
                        return [4 /*yield*/, this.permalinkService.updatePermalink(this.blogPostPermalink)];
                    case 1:
                        _a.sent();
                        this.routeHandler.navigateTo(this.blogPostPermalink.uri, false);
                        return [2 /*return*/];
                }
            });
        });
    };
    BlogPostDetailsWorkshop.prototype.deleteBlogPost = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.blogService.deleteBlogPost(this.blogPostItem.toBlogPost())];
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
    return BlogPostDetailsWorkshop;
}());
exports.BlogPostDetailsWorkshop = BlogPostDetailsWorkshop;
