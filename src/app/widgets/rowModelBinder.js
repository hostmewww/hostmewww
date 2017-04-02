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
var rowModel_1 = require("./models/rowModel");
var RowModelBinder = (function () {
    function RowModelBinder(columnModelBinder) {
        this.columnModelBinder = columnModelBinder;
        this.nodeToModel = this.nodeToModel.bind(this);
        this.modelToWidgetModel = this.modelToWidgetModel.bind(this);
    }
    RowModelBinder.prototype.nodeToModel = function (node) {
        return __awaiter(this, void 0, void 0, function () {
            var rowModel, columnModelPromises, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        rowModel = new rowModel_1.RowModel();
                        if (node.align) {
                            if (node.align.sm) {
                                rowModel.alignSm = node.align.sm;
                            }
                            if (node.align.md) {
                                rowModel.alignMd = node.align.md;
                            }
                            if (node.align.lg) {
                                rowModel.alignLg = node.align.lg;
                            }
                        }
                        if (node.justify) {
                            if (node.justify.sm) {
                                rowModel.justifySm = node.justify.sm;
                            }
                            if (node.justify.md) {
                                rowModel.justifyMd = node.justify.md;
                            }
                            if (node.justify.lg) {
                                rowModel.justifyLg = node.justify.lg;
                            }
                        }
                        if (!node.nodes) {
                            node.nodes = [];
                        }
                        columnModelPromises = node.nodes.map(this.columnModelBinder.nodeToModel);
                        _a = rowModel;
                        return [4 /*yield*/, Promise.all(columnModelPromises)];
                    case 1:
                        _a.columns = _b.sent();
                        return [2 /*return*/, rowModel];
                }
            });
        });
    };
    RowModelBinder.prototype.modelToWidgetModel = function (model, readonly) {
        if (readonly === void 0) { readonly = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var widgetModel, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        widgetModel = {
                            name: "layout-row",
                            params: {},
                            nodeType: "layout-row",
                            model: model,
                            readonly: readonly
                        };
                        _a = widgetModel;
                        return [4 /*yield*/, Promise.all(model.columns.map(function (x) { return _this.columnModelBinder.modelToWidgetModel(x, readonly); }))];
                    case 1:
                        _a.children = _b.sent();
                        widgetModel.setupViewModel = function (viewModel) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (!this.isChildrenChanged(widgetModel.children, model.columns)) return [3 /*break*/, 2];
                                        _a = widgetModel;
                                        return [4 /*yield*/, Promise.all(model.columns.map(function (x) { return _this.columnModelBinder.modelToWidgetModel(x, readonly); }))];
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
    RowModelBinder.prototype.isChildrenChanged = function (widgetChildren, modelItems) {
        return true;
    };
    RowModelBinder.prototype.getRowConfig = function (rowModel) {
        var _this = this;
        var rowConfig = {
            type: "layout-row",
            kind: "block",
            nodes: []
        };
        rowConfig.align = {};
        rowConfig.align.sm = rowModel.alignSm;
        rowConfig.align.md = rowModel.alignMd;
        rowConfig.align.lg = rowModel.alignLg;
        rowConfig.justify = {};
        rowConfig.justify.sm = rowModel.justifySm;
        rowConfig.justify.md = rowModel.justifyMd;
        rowConfig.justify.lg = rowModel.justifyLg;
        rowModel.columns.forEach(function (column) {
            rowConfig.nodes.push(_this.columnModelBinder.getColumnConfig(column));
        });
        return rowConfig;
    };
    return RowModelBinder;
}());
exports.RowModelBinder = RowModelBinder;
