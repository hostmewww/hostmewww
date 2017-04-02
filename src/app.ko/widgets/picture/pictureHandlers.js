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
var Utils = require("../../../app/core/utils");
var pictureModel_1 = require("./../../../app/widgets/models/pictureModel");
var pictureIconUrl = "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0ibmMtaWNvbiBvdXRsaW5lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjQ4cHgiIGhlaWdodD0iNDhweCIgdmlld0JveD0iMCAwIDQ4IDQ4Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjUsIDAuNSkiPgo8cG9seWxpbmUgZGF0YS1jYXA9ImJ1dHQiIGRhdGEtY29sb3I9ImNvbG9yLTIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzQ0NDQ0NCIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHBvaW50cz0iMiwzNCAxMiwyNiAyMiwzNCAKCTM0LDIwIDQ2LDMwICIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiPjwvcG9seWxpbmU+CjxyZWN0IHg9IjIiIHk9IjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzQ0NDQ0NCIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHdpZHRoPSI0NCIgaGVpZ2h0PSI0MCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciI+PC9yZWN0Pgo8Y2lyY2xlIGRhdGEtY29sb3I9ImNvbG9yLTIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzQ0NDQ0NCIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGN4PSIyMCIgY3k9IjE2IiByPSI0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIj48L2NpcmNsZT4KPC9nPjwvc3ZnPg==";
var PictureHandlers = (function () {
    function PictureHandlers(pictureModelBinder) {
        this.pictureModelBinder = pictureModelBinder;
    }
    PictureHandlers.prototype.prepareWidgetOrder = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var model, widgetModel, factoryFunction, widgetOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pictureModelBinder.nodeToModel(config)];
                    case 1:
                        model = _a.sent();
                        return [4 /*yield*/, this.pictureModelBinder.modelToWidgetModel(model)];
                    case 2:
                        widgetModel = _a.sent();
                        factoryFunction = function () {
                            var htmlElement = document.createElement("widget");
                            htmlElement.style.width = "150px";
                            ko.applyBindingsToNode(htmlElement, { widgetH: widgetModel });
                            htmlElement["attachedModel"] = widgetModel.model;
                            return { element: htmlElement };
                        };
                        widgetOrder = {
                            title: "Picture",
                            createWidget: factoryFunction,
                            createModel: function () {
                                return model;
                            }
                        };
                        return [2 /*return*/, widgetOrder];
                }
            });
        });
    };
    PictureHandlers.prototype.getWidgetOrderByConfig = function (sourceUrl, caption) {
        return __awaiter(this, void 0, void 0, function () {
            var model, widgetModel, widgetOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        model = new pictureModel_1.PictureModel();
                        model.sourceUrl = sourceUrl;
                        model.caption = caption;
                        model.layout = "noframe";
                        return [4 /*yield*/, this.pictureModelBinder.modelToWidgetModel(model)];
                    case 1:
                        widgetModel = _a.sent();
                        widgetOrder = {
                            title: "Picture",
                            createWidget: function () {
                                var htmlElement = document.createElement("widget");
                                htmlElement.style.width = "150px";
                                ko.applyBindingsToNode(htmlElement, { widgetH: widgetModel });
                                htmlElement["attachedModel"] = widgetModel.model;
                                return {
                                    element: htmlElement,
                                    onMediaUploadedCallback: function (media) {
                                        model.sourceKey = media.permalink.key;
                                        model.sourceUrl = media.media.downloadUrl;
                                        widgetModel.applyChanges();
                                    }
                                };
                            },
                            createModel: function () {
                                return model;
                            }
                        };
                        return [2 /*return*/, widgetOrder];
                }
            });
        });
    };
    PictureHandlers.prototype.getWidgetOrder = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getWidgetOrderByConfig("http://placehold.it/800x600", "Picture")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PictureHandlers.prototype.getContentDescriptorFromMedia = function (media) {
        var _this = this;
        if (!media.filename || ![".jpg", ".jpeg", ".png", ".svg", ".gif"].any(function (e) { return media.filename.endsWith(e); })) {
            return null;
        }
        var getWidgetOrderFunction = function () { return __awaiter(_this, void 0, void 0, function () {
            var config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = {
                            kind: "block",
                            type: "picture",
                            sourceKey: media.permalinkKey,
                            caption: media.filename,
                            layout: "polaroid"
                        };
                        return [4 /*yield*/, this.prepareWidgetOrder(config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        return {
            title: "Picture",
            description: media.description,
            getWidgetOrder: getWidgetOrderFunction
        };
    };
    PictureHandlers.prototype.getContentDescriptorFromDataTransfer = function (dataTransfer) {
        var _this = this;
        if (!dataTransfer.name || ![".jpg", ".jpeg", ".png", ".svg", ".gif"].any(function (e) { return dataTransfer.name.endsWith(e); })) {
            return null;
        }
        var source = dataTransfer.source;
        var droppedSourceUrl;
        if (source instanceof File) {
            droppedSourceUrl = URL.createObjectURL(source);
        }
        else {
            droppedSourceUrl = source;
        }
        var getThumbnailPromise = function () { return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = resolve;
                        return [4 /*yield*/, Utils.readBlobAsDataUrl(source)];
                    case 1:
                        _a.apply(void 0, [_c.sent()]);
                        return [2 /*return*/];
                }
            });
        }); }); };
        return {
            title: "Picture",
            description: dataTransfer.name,
            iconUrl: pictureIconUrl,
            getWidgetOrder: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getWidgetOrderByConfig(droppedSourceUrl, dataTransfer.name)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); },
            getPreviewUrl: getThumbnailPromise,
            getThumbnailUrl: getThumbnailPromise,
            uploadables: [dataTransfer.source]
        };
    };
    return PictureHandlers;
}());
exports.PictureHandlers = PictureHandlers;
