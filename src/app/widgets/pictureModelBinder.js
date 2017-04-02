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
var pictureModel_1 = require("./models/pictureModel");
var PictureModelBinder = (function () {
    function PictureModelBinder(permalinkResolver) {
        this.permalinkResolver = permalinkResolver;
    }
    PictureModelBinder.prototype.canHandleWidgetType = function (widgetType) {
        return widgetType === "picture";
    };
    PictureModelBinder.prototype.canHandleWidgetModel = function (model) {
        return model instanceof pictureModel_1.PictureModel;
    };
    PictureModelBinder.prototype.nodeToModel = function (pictureNode) {
        return __awaiter(this, void 0, void 0, function () {
            var pictureModel, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        pictureModel = new pictureModel_1.PictureModel();
                        pictureModel.caption = pictureNode.caption;
                        pictureModel.layout = pictureNode.layout;
                        pictureModel.animation = pictureNode.animation ? pictureNode.animation : "none";
                        if (!pictureNode.sourceKey) return [3 /*break*/, 2];
                        pictureModel.sourceKey = pictureNode.sourceKey;
                        _a = pictureModel;
                        return [4 /*yield*/, this.permalinkResolver.getUriByPermalinkKey(pictureNode.sourceKey)];
                    case 1:
                        _a.sourceUrl = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/, pictureModel];
                }
            });
        });
    };
    PictureModelBinder.prototype.modelToWidgetModel = function (model, readonly) {
        if (readonly === void 0) { readonly = false; }
        return __awaiter(this, void 0, void 0, function () {
            var pictureWidgetModel;
            return __generator(this, function (_a) {
                pictureWidgetModel = {
                    name: "paper-picture",
                    params: {},
                    setupViewModel: function (viewModel) {
                        viewModel.attachToModel(model);
                    },
                    nodeType: "picture",
                    model: model,
                    editor: "picture-editor-editor",
                    readonly: readonly
                };
                return [2 /*return*/, pictureWidgetModel];
            });
        });
    };
    PictureModelBinder.prototype.getConfig = function (pictureModel) {
        var pictureNode = {
            kind: "block",
            type: "picture",
            sourceKey: pictureModel.sourceKey,
            caption: pictureModel.caption,
            animation: pictureModel.animation,
            layout: pictureModel.layout
        };
        return pictureNode;
    };
    return PictureModelBinder;
}());
exports.PictureModelBinder = PictureModelBinder;
