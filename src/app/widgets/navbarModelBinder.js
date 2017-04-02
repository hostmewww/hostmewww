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
var navbarModel_1 = require("./models/navbarModel");
var navbarItemModel_1 = require("./models/navbarItemModel");
var navigationEvents_1 = require("../navigation/navigationEvents");
var NavbarModelBinder = (function () {
    function NavbarModelBinder(navigationService, permalinkService, routeHandler, eventManager) {
        this.navigationService = navigationService;
        this.permalinkService = permalinkService;
        this.eventManager = eventManager;
        this.routeHandler = routeHandler;
        this.nodeToModel = this.nodeToModel.bind(this);
        this.modelToWidgetModel = this.modelToWidgetModel.bind(this);
        this.navigationItemToNavbarItemModel = this.navigationItemToNavbarItemModel.bind(this);
    }
    NavbarModelBinder.prototype.nodeToModel = function (node) {
        return __awaiter(this, void 0, void 0, function () {
            var model, rootKey, navigationItem, currentUrl, navbarItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        model = new navbarModel_1.NavbarModel();
                        rootKey = node["rootKey"];
                        return [4 /*yield*/, this.navigationService.getNavigationItem(node["rootKey"])];
                    case 1:
                        navigationItem = _a.sent();
                        currentUrl = this.routeHandler.getCurrentPageUrl();
                        return [4 /*yield*/, this.navigationItemToNavbarItemModel(navigationItem, currentUrl)];
                    case 2:
                        navbarItem = _a.sent();
                        model.root = navbarItem;
                        model.rootKey = rootKey;
                        model.align = node.align;
                        return [2 /*return*/, model];
                }
            });
        });
    };
    NavbarModelBinder.prototype.modelToWidgetModel = function (navbarModel, readonly) {
        if (readonly === void 0) { readonly = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var navbarWidgetModel;
            return __generator(this, function (_a) {
                navbarWidgetModel = {
                    name: "navbar",
                    params: {},
                    setupViewModel: function (viewModelBinder) {
                        viewModelBinder.attachToModel(navbarModel);
                    },
                    model: navbarModel,
                    nodeType: "navbar",
                    editor: "navbar-editor",
                    readonly: readonly
                };
                this.eventManager.addEventListener(navigationEvents_1.NavigationEvents.onNavigationItemUpdate, function () { return __awaiter(_this, void 0, void 0, function () {
                    var currentUrl, navigationItem, navbarItem;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!navbarWidgetModel.applyChanges) return [3 /*break*/, 3];
                                currentUrl = this.routeHandler.getCurrentPageUrl();
                                return [4 /*yield*/, this.navigationService.getNavigationItem(navbarModel.rootKey)];
                            case 1:
                                navigationItem = _a.sent();
                                return [4 /*yield*/, this.navigationItemToNavbarItemModel(navigationItem, currentUrl)];
                            case 2:
                                navbarItem = _a.sent();
                                navbarModel.root = navbarItem;
                                navbarWidgetModel.applyChanges();
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/, navbarWidgetModel];
            });
        });
    };
    NavbarModelBinder.prototype.canHandleWidgetType = function (widgetType) {
        return widgetType === "navbar";
    };
    NavbarModelBinder.prototype.canHandleWidgetModel = function (model) {
        return model instanceof navbarModel_1.NavbarModel;
    };
    NavbarModelBinder.prototype.navigationItemToNavbarItemModel = function (navItem, currentUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var navbarItem, tasks, results, permalink, url, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        navbarItem = new navbarItemModel_1.NavbarItemModel();
                        navbarItem.label = navItem.label;
                        if (!navItem.navigationItems) return [3 /*break*/, 2];
                        tasks = [];
                        navItem.navigationItems.forEach(function (child) {
                            tasks.push(_this.navigationItemToNavbarItemModel(child, currentUrl));
                        });
                        return [4 /*yield*/, Promise.all(tasks)];
                    case 1:
                        results = _a.sent();
                        results.forEach(function (child) {
                            navbarItem.nodes.push(child);
                        });
                        return [3 /*break*/, 5];
                    case 2:
                        if (!navItem.permalinkKey) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.permalinkService.getPermalinkByKey(navItem.permalinkKey)];
                    case 3:
                        permalink = _a.sent();
                        url = permalink ? "/#" + permalink.uri : "";
                        navbarItem.url = url;
                        return [3 /*break*/, 5];
                    case 4:
                        if (navItem.externalUrl) {
                            url = navItem.externalUrl;
                            navbarItem.url = url;
                        }
                        _a.label = 5;
                    case 5:
                        navbarItem.isActive = (navbarItem.url === currentUrl);
                        return [2 /*return*/, navbarItem];
                }
            });
        });
    };
    NavbarModelBinder.prototype.getConfig = function (model) {
        var navbarConfig = {
            kind: "block",
            type: "navbar",
            rootKey: model.rootKey,
            align: model.align
        };
        return navbarConfig;
    };
    return NavbarModelBinder;
}());
exports.NavbarModelBinder = NavbarModelBinder;
