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
var sectionModel_1 = require("./models/sectionModel");
var SectionModelBinder = (function () {
    function SectionModelBinder(rowModelBinder, permalinkResolver) {
        this.rowModelBinder = rowModelBinder;
        this.permalinkResolver = permalinkResolver;
        this.nodeToModel = this.nodeToModel.bind(this);
        this.modelToWidgetModel = this.modelToWidgetModel.bind(this);
    }
    SectionModelBinder.prototype.nodeToModel = function (sectionNode) {
        return __awaiter(this, void 0, void 0, function () {
            var sectionModel, _a, rowModelPromises, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        sectionModel = new sectionModel_1.SectionModel();
                        if (!sectionNode.nodes) {
                            sectionNode.nodes = [];
                        }
                        if (sectionNode.layout) {
                            sectionModel.layout = sectionNode.layout;
                        }
                        if (sectionNode.padding) {
                            sectionModel.padding = sectionNode.padding;
                        }
                        if (sectionNode.snapping) {
                            sectionModel.snap = sectionNode.snapping;
                        }
                        if (!sectionNode.background) return [3 /*break*/, 2];
                        if (sectionNode.background.color) {
                            sectionModel.backgroundColor = sectionNode.background.color;
                        }
                        if (sectionNode.background.size) {
                            sectionModel.backgroundSize = sectionNode.background.size;
                        }
                        if (sectionNode.background.position) {
                            sectionModel.backgroundPosition = sectionNode.background.position;
                        }
                        if (!sectionNode.background.picture) return [3 /*break*/, 2];
                        sectionModel.backgroundType = "picture";
                        sectionModel.backgroundSourceKey = sectionNode.background.picture.sourcePermalinkKey;
                        _a = sectionModel;
                        return [4 /*yield*/, this.permalinkResolver.getUriByPermalinkKey(sectionModel.backgroundSourceKey)];
                    case 1:
                        _a.backgroundPictureUrl = _c.sent();
                        _c.label = 2;
                    case 2:
                        rowModelPromises = sectionNode.nodes.map(this.rowModelBinder.nodeToModel);
                        _b = sectionModel;
                        return [4 /*yield*/, Promise.all(rowModelPromises)];
                    case 3:
                        _b.rows = _c.sent();
                        return [2 /*return*/, sectionModel];
                }
            });
        });
    };
    SectionModelBinder.prototype.modelToWidgetModel = function (model, readonly) {
        if (readonly === void 0) { readonly = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var widgetModel, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        widgetModel = {
                            name: "layout-section",
                            params: {},
                            nodeType: "layout-section",
                            model: model,
                            editor: "layout-section-editor",
                            readonly: readonly
                        };
                        _a = widgetModel;
                        return [4 /*yield*/, Promise.all(model.rows.map(function (x) { return _this.rowModelBinder.modelToWidgetModel(x, readonly); }))];
                    case 1:
                        _a.children = _b.sent();
                        widgetModel.setupViewModel = function (viewModel) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (!this.isChildrenChanged(widgetModel.children, model.rows)) return [3 /*break*/, 2];
                                        _a = widgetModel;
                                        return [4 /*yield*/, Promise.all(model.rows.map(function (x) { return _this.rowModelBinder.modelToWidgetModel(x, readonly); }))];
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
    SectionModelBinder.prototype.isChildrenChanged = function (widgetChildren, modelItems) {
        return (widgetChildren && !modelItems) ||
            (!widgetChildren && modelItems) ||
            (widgetChildren && modelItems && widgetChildren.length !== modelItems.length);
    };
    SectionModelBinder.prototype.getSectionConfig = function (sectionModel) {
        var _this = this;
        var sectionConfig = {
            type: "layout-section",
            kind: "block",
            nodes: [],
            layout: sectionModel.layout,
            padding: sectionModel.padding,
            snapping: sectionModel.snap,
            background: {
                color: sectionModel.backgroundColor,
                size: sectionModel.backgroundSize,
                position: sectionModel.backgroundPosition
            }
        };
        if (sectionModel.backgroundType === "picture") {
            sectionConfig.background.picture = {
                sourcePermalinkKey: sectionModel.backgroundSourceKey,
                repeat: sectionModel.backgroundRepeat
            };
        }
        sectionModel.rows.forEach(function (row) {
            sectionConfig.nodes.push(_this.rowModelBinder.getRowConfig(row));
        });
        return sectionConfig;
    };
    return SectionModelBinder;
}());
exports.SectionModelBinder = SectionModelBinder;
