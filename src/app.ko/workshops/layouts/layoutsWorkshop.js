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
var layoutItem_1 = require("./layoutItem");
var DeleteKeyCode = 46;
var LayoutsWorkshop = (function () {
    function LayoutsWorkshop(layoutService, fileService, permalinkService, routeHandler, viewManager) {
        this.layoutService = layoutService;
        this.fileService = fileService;
        this.permalinkService = permalinkService;
        this.routeHandler = routeHandler;
        this.viewManager = viewManager;
        this.searchLayouts = this.searchLayouts.bind(this);
        this.addLayout = this.addLayout.bind(this);
        this.selectLayout = this.selectLayout.bind(this);
        this.keydown = this.keydown.bind(this);
        this.layouts = ko.observableArray();
        this.selectedLayout = ko.observable();
        this.searchPattern = ko.observable();
        this.searchPattern.subscribe(this.searchLayouts);
        this.working = ko.observable(true);
        this.init();
        this.searchLayouts();
    }
    LayoutsWorkshop.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.template = {
                    "kind": "block",
                    "nodes": [{
                            "kind": "block",
                            "type": "page"
                        }],
                    "type": "layout"
                };
                return [2 /*return*/];
            });
        });
    };
    LayoutsWorkshop.prototype.searchLayouts = function (searchPattern) {
        if (searchPattern === void 0) { searchPattern = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var layouts, layoutItems;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.working(true);
                        return [4 /*yield*/, this.layoutService.search(searchPattern)];
                    case 1:
                        layouts = _a.sent();
                        layoutItems = layouts.map(function (layout) { return new layoutItem_1.LayoutItem(layout); });
                        this.layouts(layoutItems);
                        this.working(false);
                        return [2 /*return*/];
                }
            });
        });
    };
    LayoutsWorkshop.prototype.selectLayout = function (layout) {
        this.selectedLayout(layout);
        this.viewManager.openWorkshop("layout-details-workshop", layout);
    };
    LayoutsWorkshop.prototype.addLayout = function () {
        return __awaiter(this, void 0, void 0, function () {
            var layout, content, layoutItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.working(true);
                        return [4 /*yield*/, this.layoutService.createLayout("New Layout", "", "")];
                    case 1:
                        layout = _a.sent();
                        return [4 /*yield*/, this.fileService.createFile(this.template)];
                    case 2:
                        content = _a.sent();
                        layout.contentKey = content.key;
                        return [4 /*yield*/, this.layoutService.updateLayout(layout)];
                    case 3:
                        _a.sent();
                        layoutItem = new layoutItem_1.LayoutItem(layout);
                        this.layouts.push(layoutItem);
                        this.selectLayout(layoutItem);
                        this.routeHandler.navigateTo(layoutItem.uriTemplate());
                        this.working(false);
                        return [2 /*return*/];
                }
            });
        });
    };
    LayoutsWorkshop.prototype.deleteSelectedLayout = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.layoutService.deleteLayout(this.selectedLayout().toLayout())];
                    case 1:
                        _a.sent();
                        this.routeHandler.navigateTo("/");
                        this.viewManager.closeWorkshop("layout-details-workshop");
                        this.viewManager.openWorkshop("layouts");
                        return [2 /*return*/];
                }
            });
        });
    };
    LayoutsWorkshop.prototype.keydown = function (item, event) {
        if (event.keyCode === DeleteKeyCode) {
            this.deleteSelectedLayout();
        }
    };
    return LayoutsWorkshop;
}());
exports.LayoutsWorkshop = LayoutsWorkshop;
