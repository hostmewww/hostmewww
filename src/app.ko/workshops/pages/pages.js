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
var pageItem_1 = require("../../../app.ko/workshops/pages/pageItem");
var DeleteKeyCode = 46;
var PagesWorkshop = (function () {
    function PagesWorkshop(pageService, fileService, permalinkService, routeHandler, viewManager) {
        this.pageService = pageService;
        this.fileService = fileService;
        this.permalinkService = permalinkService;
        this.routeHandler = routeHandler;
        this.viewManager = viewManager;
        this.searchPages = this.searchPages.bind(this);
        this.addPage = this.addPage.bind(this);
        this.selectPage = this.selectPage.bind(this);
        this.keydown = this.keydown.bind(this);
        this.pages = ko.observableArray();
        this.selectedPage = ko.observable();
        this.searchPattern = ko.observable();
        this.searchPattern.subscribe(this.searchPages);
        this.working = ko.observable(true);
        this.init();
        this.searchPages();
    }
    PagesWorkshop.prototype.init = function () {
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
                                                                    "text": "New page"
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
                    "type": "page"
                };
                return [2 /*return*/];
            });
        });
    };
    PagesWorkshop.prototype.searchPages = function (searchPattern) {
        if (searchPattern === void 0) { searchPattern = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var pages, pageItems;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.working(true);
                        return [4 /*yield*/, this.pageService.search(searchPattern)];
                    case 1:
                        pages = _a.sent();
                        pageItems = pages.map(function (page) { return new pageItem_1.PageItem(page); });
                        this.pages(pageItems);
                        this.working(false);
                        return [2 /*return*/];
                }
            });
        });
    };
    PagesWorkshop.prototype.selectPage = function (page) {
        this.selectedPage(page);
        this.viewManager.openWorkshop("page-details-workshop", page);
    };
    PagesWorkshop.prototype.addPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var page, createPermalinkPromise, createContentPromise, results, permalink, content, pageItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.working(true);
                        return [4 /*yield*/, this.pageService.createPage("New page", "", "")];
                    case 1:
                        page = _a.sent();
                        createPermalinkPromise = this.permalinkService.createPermalink("/new", page.key);
                        createContentPromise = this.fileService.createFile(this.template);
                        return [4 /*yield*/, Promise.all([createPermalinkPromise, createContentPromise])];
                    case 2:
                        results = _a.sent();
                        permalink = results[0];
                        content = results[1];
                        page.permalinkKey = permalink.key;
                        page.contentKey = content.key;
                        return [4 /*yield*/, this.pageService.updatePage(page)];
                    case 3:
                        _a.sent();
                        this.routeHandler.navigateTo(permalink.uri);
                        pageItem = new pageItem_1.PageItem(page);
                        this.pages.push(pageItem);
                        this.selectPage(pageItem);
                        this.working(false);
                        return [2 /*return*/];
                }
            });
        });
    };
    PagesWorkshop.prototype.deleteSelectedPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pageService.deletePage(this.selectedPage().toPage())];
                    case 1:
                        _a.sent();
                        this.routeHandler.navigateTo("/");
                        this.viewManager.closeWorkshop("page-details-workshop");
                        this.viewManager.openWorkshop("pages");
                        return [2 /*return*/];
                }
            });
        });
    };
    PagesWorkshop.prototype.keydown = function (item, event) {
        if (event.keyCode === DeleteKeyCode) {
            this.deleteSelectedPage();
        }
    };
    return PagesWorkshop;
}());
exports.PagesWorkshop = PagesWorkshop;
