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
var layoutModel_1 = require("./models/layoutModel");
var pagePlaceholderModel_1 = require("./models/pagePlaceholderModel");
var LayoutModelBinder = (function () {
    function LayoutModelBinder(fileService, permalinkService, layoutService, pageService, routeHandler, sectionModelBinder, pageModelBinder) {
        this.fileService = fileService;
        this.layoutService = layoutService;
        this.pageService = pageService;
        this.routeHandler = routeHandler;
        this.sectionModelBinder = sectionModelBinder;
        this.pageModelBinder = pageModelBinder;
        this.permalinkService = permalinkService;
        this.nodeToModel = this.nodeToModel.bind(this);
        this.modelToWidgetModel = this.modelToWidgetModel.bind(this);
    }
    LayoutModelBinder.prototype.getCurrentLayout = function (layoutMode) {
        return __awaiter(this, void 0, void 0, function () {
            var layoutModel, layoutComponentAreReadonly;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCurrentLayoutModel(layoutMode)];
                    case 1:
                        layoutModel = _a.sent();
                        layoutComponentAreReadonly = !layoutMode;
                        return [4 /*yield*/, this.modelToWidgetModel(layoutModel, layoutComponentAreReadonly)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    LayoutModelBinder.prototype.getCurrentLayoutModel = function (layoutMode) {
        return __awaiter(this, void 0, void 0, function () {
            var url, layoutNode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.routeHandler.getCurrentPageUrl();
                        return [4 /*yield*/, this.layoutService.getLayoutByRoute(url)];
                    case 1:
                        layoutNode = _a.sent();
                        return [4 /*yield*/, this.nodeToModel(layoutNode, url, layoutMode)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    LayoutModelBinder.prototype.nodeToModel = function (layoutNode, currentUrl, layoutMode) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var layoutModel, layoutContentNode, modelPromises, models;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        layoutModel = new layoutModel_1.LayoutModel();
                        layoutModel.title = layoutNode.title;
                        layoutModel.description = layoutNode.description;
                        layoutModel.uriTemplate = layoutNode.uriTemplate;
                        return [4 /*yield*/, this.fileService.getFileByKey(layoutNode.contentKey)];
                    case 1:
                        layoutContentNode = _a.sent();
                        modelPromises = layoutContentNode.nodes.map(function (node) { return __awaiter(_this, void 0, void 0, function () {
                            var permalink, pageKey, page;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(node.type === "page")) return [3 /*break*/, 6];
                                        if (!layoutMode) return [3 /*break*/, 2];
                                        return [4 /*yield*/, Promise.resolve(new pagePlaceholderModel_1.PagePlaceholderModel())];
                                    case 1: return [2 /*return*/, _a.sent()];
                                    case 2: return [4 /*yield*/, this.permalinkService.getPermalinkByUrl(currentUrl)];
                                    case 3:
                                        permalink = _a.sent();
                                        pageKey = permalink.targetKey;
                                        return [4 /*yield*/, this.pageService.getPageByKey(pageKey)];
                                    case 4:
                                        page = _a.sent();
                                        return [4 /*yield*/, this.pageModelBinder.nodeToModel(page)];
                                    case 5: return [2 /*return*/, _a.sent()];
                                    case 6:
                                        if (!(node.type === "layout-section")) return [3 /*break*/, 8];
                                        return [4 /*yield*/, this.sectionModelBinder.nodeToModel(node)];
                                    case 7: return [2 /*return*/, _a.sent()];
                                    case 8: throw Error("Layout can not contain nodeType:" + node.type);
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(modelPromises)];
                    case 2:
                        models = _a.sent();
                        layoutModel.sections = models;
                        return [2 /*return*/, layoutModel];
                }
            });
        });
    };
    LayoutModelBinder.prototype.modelToWidgetModel = function (model, readonly) {
        if (readonly === void 0) { readonly = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var widgetModel, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        widgetModel = {
                            name: "paper-layout",
                            params: {},
                            nodeType: "layout",
                            model: model,
                            readonly: readonly
                        };
                        _a = widgetModel;
                        return [4 /*yield*/, this.getWidgetsFromModel(model.sections, readonly)];
                    case 1:
                        _a.children = _b.sent();
                        widgetModel.setupViewModel = function (viewModel) { return __awaiter(_this, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (!this.isChildrenChanged(widgetModel.children, model.sections)) return [3 /*break*/, 2];
                                        _a = widgetModel;
                                        return [4 /*yield*/, this.getWidgetsFromModel(model.sections)];
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
    LayoutModelBinder.prototype.getWidgetsFromModel = function (widgetModels, readonly) {
        if (readonly === void 0) { readonly = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(widgetModels.map(function (widget) { return __awaiter(_this, void 0, void 0, function () {
                            var widgetModel;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(widget instanceof pageModel_1.PageModel)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this.pageModelBinder.modelToWidgetModel(widget)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                    case 2:
                                        if (!(widget instanceof pagePlaceholderModel_1.PagePlaceholderModel)) return [3 /*break*/, 4];
                                        widgetModel = {
                                            name: "paper-page-placeholder",
                                            params: {},
                                            nodeType: "page-placeholder",
                                            setupViewModel: function (viewModel) {
                                                viewModel.attachToModel(widget);
                                            },
                                            model: widget
                                        };
                                        return [4 /*yield*/, Promise.resolve(widgetModel)];
                                    case 3: return [2 /*return*/, _a.sent()];
                                    case 4: return [4 /*yield*/, this.sectionModelBinder.modelToWidgetModel(widget, readonly)];
                                    case 5: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); }))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    LayoutModelBinder.prototype.isChildrenChanged = function (widgetChildren, modelItems) {
        return (widgetChildren && !modelItems) ||
            (!widgetChildren && modelItems) ||
            (widgetChildren && modelItems && widgetChildren.length !== modelItems.length);
    };
    LayoutModelBinder.prototype.getConfig = function (layoutModel) {
        var _this = this;
        var layoutConfig = {
            kind: "block",
            type: "layout",
            nodes: []
        };
        layoutModel.sections.forEach(function (widget) {
            if (widget instanceof pagePlaceholderModel_1.PagePlaceholderModel) {
                layoutConfig.nodes.push({ kind: "block", type: "page" });
            }
            else {
                layoutConfig.nodes.push(_this.sectionModelBinder.getSectionConfig(widget));
            }
        });
        return layoutConfig;
    };
    LayoutModelBinder.prototype.setConfig = function (layout, config) {
        return __awaiter(this, void 0, void 0, function () {
            var file;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fileService.getFileByKey(layout.contentKey)];
                    case 1:
                        file = _a.sent();
                        Object.assign(file, config);
                        return [4 /*yield*/, this.fileService.updateFile(file)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LayoutModelBinder.prototype.updateContent = function (layoutModel) {
        return __awaiter(this, void 0, void 0, function () {
            var url, layout, file, config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.routeHandler.getCurrentPageUrl();
                        return [4 /*yield*/, this.layoutService.getLayoutByRoute(url)];
                    case 1:
                        layout = _a.sent();
                        return [4 /*yield*/, this.fileService.getFileByKey(layout.contentKey)];
                    case 2:
                        file = _a.sent();
                        config = this.getConfig(layoutModel);
                        Object.assign(file, config);
                        return [4 /*yield*/, this.fileService.updateFile(file)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return LayoutModelBinder;
}());
exports.LayoutModelBinder = LayoutModelBinder;
