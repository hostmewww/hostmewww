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
var _ = require("lodash");
var layoutsPath = "layouts";
var LayoutService = (function () {
    function LayoutService(objectStorage) {
        this.objectStorage = objectStorage;
    }
    LayoutService.prototype.searchByTags = function (tags, tagValue, startAtSearch) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.objectStorage.searchObjects(layoutsPath, tags, tagValue, startAtSearch)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    LayoutService.prototype.getLayoutByKey = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.objectStorage.getObject(key)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    LayoutService.prototype.search = function (pattern) {
        return this.searchByTags(["title"], pattern, true);
    };
    LayoutService.prototype.deleteLayout = function (layout) {
        return __awaiter(this, void 0, void 0, function () {
            var deleteContentPromise, deleteLayoutPromise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        deleteContentPromise = this.objectStorage.deleteObject(layout.contentKey);
                        deleteLayoutPromise = this.objectStorage.deleteObject(layout.key);
                        return [4 /*yield*/, Promise.all([deleteContentPromise, deleteLayoutPromise])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LayoutService.prototype.createLayout = function (title, description, uriTemplate) {
        return __awaiter(this, void 0, void 0, function () {
            var layoutId, layout;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        layoutId = layoutsPath + "/" + Utils.guid();
                        layout = {
                            key: layoutId,
                            title: title,
                            description: description,
                            uriTemplate: uriTemplate,
                        };
                        return [4 /*yield*/, this.objectStorage.addObject(layoutId, layout)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, layout];
                }
            });
        });
    };
    LayoutService.prototype.updateLayout = function (layout) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.objectStorage.updateObject(layout.key, layout)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LayoutService.prototype.getLayoutByRoute = function (route) {
        return __awaiter(this, void 0, void 0, function () {
            var layouts, filteredLayouts, layout;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!route) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.objectStorage.searchObjects(layoutsPath)];
                    case 1:
                        layouts = _a.sent();
                        if (layouts && layouts.length) {
                            filteredLayouts = layouts.filter(function (lyout) {
                                var regExp = lyout.uriTemplate;
                                return !!route.match(regExp);
                            });
                            if (filteredLayouts && filteredLayouts.length) {
                                layout = _.maxBy(filteredLayouts, function (item) { return item.uriTemplate.length; });
                                return [2 /*return*/, layout];
                            }
                            else {
                                return [2 /*return*/, null];
                            }
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return LayoutService;
}());
exports.LayoutService = LayoutService;
