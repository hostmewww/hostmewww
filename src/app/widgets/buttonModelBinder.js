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
var buttonModel_1 = require("./models/buttonModel");
var ButtonModelBinder = (function () {
    function ButtonModelBinder(permalinkResolver) {
        this.permalinkResolver = permalinkResolver;
    }
    ButtonModelBinder.prototype.canHandleWidgetType = function (widgetType) {
        return widgetType === "button";
    };
    ButtonModelBinder.prototype.canHandleWidgetModel = function (model) {
        return model instanceof buttonModel_1.ButtonModel;
    };
    ButtonModelBinder.prototype.nodeToModel = function (buttonContract) {
        return __awaiter(this, void 0, void 0, function () {
            var model, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        model = new buttonModel_1.ButtonModel();
                        model.label = buttonContract.label;
                        model.style = buttonContract.style;
                        model.size = buttonContract.size;
                        if (!buttonContract.hyperlink) return [3 /*break*/, 2];
                        _a = model;
                        return [4 /*yield*/, this.permalinkResolver.getHyperlinkFromConfig(buttonContract.hyperlink)];
                    case 1:
                        _a.hyperlink = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/, model];
                }
            });
        });
    };
    ButtonModelBinder.prototype.modelToWidgetModel = function (buttonModel, readonly) {
        if (readonly === void 0) { readonly = false; }
        return __awaiter(this, void 0, void 0, function () {
            var widgetModel;
            return __generator(this, function (_a) {
                widgetModel = {
                    name: "paper-button",
                    params: {},
                    setupViewModel: function (viewModel) {
                        viewModel.attachToModel(buttonModel);
                    },
                    nodeType: "button",
                    model: buttonModel,
                    editor: "paper-button-editor",
                    readonly: readonly
                };
                return [2 /*return*/, widgetModel];
            });
        });
    };
    ButtonModelBinder.prototype.getConfig = function (buttonModel) {
        var buttonConfig = {
            kind: "block",
            type: "button",
            label: buttonModel.label,
            style: buttonModel.style,
            size: buttonModel.size
        };
        if (buttonModel.hyperlink) {
            buttonConfig.hyperlink = {
                target: buttonModel.hyperlink.target,
                permalinkKey: buttonModel.hyperlink.permalinkKey,
                href: buttonModel.hyperlink.href
            };
        }
        return buttonConfig;
    };
    return ButtonModelBinder;
}());
exports.ButtonModelBinder = ButtonModelBinder;
