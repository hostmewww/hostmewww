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
var hyperlinkModel_1 = require("./hyperlinkModel");
var PermalinkResolver = (function () {
    function PermalinkResolver(permalinkService, permalinkResolvers) {
        if (permalinkResolvers === void 0) { permalinkResolvers = []; }
        this.permalinkService = permalinkService;
        this.permalinkResolvers = permalinkResolvers;
    }
    PermalinkResolver.prototype.getUriByPermalinkKey = function (permalinkKey) {
        return __awaiter(this, void 0, void 0, function () {
            var permalink;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.permalinkService.getPermalinkByKey(permalinkKey)];
                    case 1:
                        permalink = _a.sent();
                        return [2 /*return*/, this.getUriByPermalink(permalink)];
                }
            });
        });
    };
    PermalinkResolver.prototype.getUriByPermalink = function (permalink) {
        return __awaiter(this, void 0, void 0, function () {
            var i, resolvedUri;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.permalinkResolvers.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.permalinkResolvers[i].getUriByPermalink(permalink)];
                    case 2:
                        resolvedUri = _a.sent();
                        if (resolvedUri) {
                            return [2 /*return*/, resolvedUri];
                        }
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, permalink.uri];
                }
            });
        });
    };
    PermalinkResolver.prototype.getHyperlinkByPermalink = function (permalink, target) {
        return __awaiter(this, void 0, void 0, function () {
            var hyperlinkModel, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.permalinkResolvers.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.permalinkResolvers[i].getHyperlinkByPermalink(permalink, target)];
                    case 2:
                        hyperlinkModel = _a.sent();
                        if (hyperlinkModel) {
                            return [2 /*return*/, hyperlinkModel];
                        }
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PermalinkResolver.prototype.getHyperlinkFromConfig = function (hyperlink) {
        return __awaiter(this, void 0, void 0, function () {
            var hyperlinkModel, permalinkKey, permalink;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        permalinkKey = null;
                        if (hyperlink.permalinkKey) {
                            permalinkKey = hyperlink.permalinkKey;
                        }
                        else if (hyperlink.href.startsWith("permalinks/")) {
                            permalinkKey = hyperlink.href;
                        }
                        if (!permalinkKey) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.permalinkService.getPermalinkByKey(permalinkKey)];
                    case 1:
                        permalink = _a.sent();
                        if (!permalink) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getHyperlinkByPermalink(permalink, hyperlink.target)];
                    case 2:
                        hyperlinkModel = _a.sent();
                        if (!hyperlinkModel) {
                            hyperlinkModel = new hyperlinkModel_1.HyperlinkModel();
                            hyperlinkModel.title = permalink.uri;
                            hyperlinkModel.target = hyperlink.target || "_blank";
                            hyperlinkModel.permalinkKey = permalink.key;
                            hyperlinkModel.href = permalink.uri;
                        }
                        return [2 /*return*/, hyperlinkModel];
                    case 3:
                        if (hyperlink.href) {
                            hyperlinkModel = new hyperlinkModel_1.HyperlinkModel();
                            hyperlinkModel.title = "External link";
                            hyperlinkModel.target = hyperlink.target || "_blank";
                            hyperlinkModel.permalinkKey = null;
                            hyperlinkModel.href = hyperlink.href;
                            return [2 /*return*/, hyperlinkModel];
                        }
                        throw "Hyperlink config doesn't contain neither \"permalinkKey\" nor \"href\" properties.";
                }
            });
        });
    };
    return PermalinkResolver;
}());
exports.PermalinkResolver = PermalinkResolver;
