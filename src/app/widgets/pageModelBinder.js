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
var pageModel_1 = require("./models/pageModel");
var Utils = require("../core/utils");
var PageModelBinder = (function () {
    function PageModelBinder(pageService, permalinkService, fileService, sectionModelBinder, routeHandler) {
        this.disposeBag = Utils.createFunctionBag();
        this.pageService = pageService;
        this.permalinkService = permalinkService;
        this.fileService = fileService;
        this.sectionModelBinder = sectionModelBinder;
        this.routeHandler = routeHandler;
        this.nodeToModel = this.nodeToModel.bind(this);
        this.modelToWidgetModel = this.modelToWidgetModel.bind(this);
    }
    PageModelBinder.prototype.nodeToModel = function (pageNode) {
        return __awaiter(this, void 0, void 0, function () {
            var pageModel, pageContentNode, sectionModelPromises, sections;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pageModel = new pageModel_1.PageModel();
                        pageModel.title = pageNode.title;
                        pageModel.description = pageNode.description;
                        pageModel.keywords = pageNode.keywords;
                        return [4 /*yield*/, this.fileService.getFileByKey(pageNode.contentKey)];
                    case 1:
                        pageContentNode = _a.sent();
                        sectionModelPromises = pageContentNode.nodes.map(this.sectionModelBinder.nodeToModel);
                        return [4 /*yield*/, Promise.all(sectionModelPromises)];
                    case 2:
                        sections = _a.sent();
                        pageModel.sections = sections;
                        return [2 /*return*/, pageModel];
                }
            });
        });
    };
    PageModelBinder.prototype.modelToWidgetModel = function (pageModel) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var widgetModel, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        widgetModel = {
                            name: "paper-page",
                            params: {},
                            nodeType: "page",
                            model: pageModel
                        };
                        _a = widgetModel;
                        return [4 /*yield*/, Promise.all(pageModel.sections.map(function (x) { return _this.sectionModelBinder.modelToWidgetModel(x, false); }))];
                    case 1:
                        _a.children = _b.sent();
                        widgetModel.setupViewModel = function (viewModel) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (!this.isChildrenChanged(widgetModel.children, pageModel.sections)) return [3 /*break*/, 2];
                                        _a = widgetModel;
                                        return [4 /*yield*/, Promise.all(pageModel.sections.map(function (x) { return _this.sectionModelBinder.modelToWidgetModel(x, false); }))];
                                    case 1:
                                        _a.children = _b.sent();
                                        _b.label = 2;
                                    case 2:
                                        viewModel.attachToModel(widgetModel);
                                        return [2 /*return*/];
                                }
                            });
                        }); };
                        return [2 /*return*/, widgetModel];
                }
            });
        });
    };
    PageModelBinder.prototype.isChildrenChanged = function (widgetChildren, modelItems) {
        return (widgetChildren && !modelItems) ||
            (!widgetChildren && modelItems) ||
            (widgetChildren && modelItems && widgetChildren.length !== modelItems.length);
    };
    PageModelBinder.prototype.getPageConfig = function (pageModel) {
        var _this = this;
        var pageConfig = {
            kind: "block",
            type: "page",
            nodes: []
        };
        pageModel.sections.forEach(function (section) {
            pageConfig.nodes.push(_this.sectionModelBinder.getSectionConfig(section));
        });
        return pageConfig;
    };
    PageModelBinder.prototype.updateContent = function (pageModel) {
        return __awaiter(this, void 0, void 0, function () {
            var url, permalink, pageKey, page, file, config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.routeHandler.getCurrentPageUrl();
                        return [4 /*yield*/, this.permalinkService.getPermalinkByUrl(url)];
                    case 1:
                        permalink = _a.sent();
                        pageKey = permalink.targetKey;
                        return [4 /*yield*/, this.pageService.getPageByKey(pageKey)];
                    case 2:
                        page = _a.sent();
                        return [4 /*yield*/, this.fileService.getFileByKey(page.contentKey)];
                    case 3:
                        file = _a.sent();
                        config = this.getPageConfig(pageModel);
                        Object.assign(file, config);
                        return [4 /*yield*/, this.fileService.updateFile(file)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return PageModelBinder;
}());
exports.PageModelBinder = PageModelBinder;
