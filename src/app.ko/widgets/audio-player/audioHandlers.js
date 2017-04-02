"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var mediaHandlers_1 = require("../../../app.ko/editors/mediaHandlers");
var AudioHandlers = (function (_super) {
    __extends(AudioHandlers, _super);
    function AudioHandlers(audioPlayerModelBinder) {
        var _this = _super.call(this, ["audio/webm", "video/webm", "audio/mp4", "audio/mp3", "video/mp4", "audio/ogg", "video/ogg", "application/ogg"], [".webm", ".mp4", ".m4a", ".mp3", ".m4p", ".m4b", ".m4r", ".m4v", ".ogg", ".oga", ".ogv", ".ogx", ".ogm"]) || this;
        _this.audioPlayerModelBinder = audioPlayerModelBinder;
        return _this;
    }
    AudioHandlers.prototype.getWidgetOrderByConfig = function (sourceUrl) {
        var pictureWidgetModel = {
            name: "paper-audio-player",
            params: {},
            oncreate: function (audioPlayerModel) {
                audioPlayerModel.sourceUrl(sourceUrl);
                audioPlayerModel.controls(true);
                audioPlayerModel.autoplay(false);
            },
            nodeType: "audio-player"
        };
        var widgetOrder = {
            title: "Audio",
            createWidget: function () {
                var htmlElement = document.createElement("widget");
                htmlElement["attachedModel"] = pictureWidgetModel.model;
                ko.applyBindingsToNode(htmlElement, { component: { name: pictureWidgetModel.name, oncreate: pictureWidgetModel.oncreate } });
                return { element: htmlElement };
            },
            createModel: function () {
                return pictureWidgetModel.model;
            }
        };
        return widgetOrder;
    };
    AudioHandlers.prototype.getWidgetOrder = function () {
        return Promise.resolve(this.getWidgetOrderByConfig(AudioHandlers.DefaultAudioUri));
    };
    AudioHandlers.prototype.getContentDescriptorFromMedia = function (media) {
        var _this = this;
        var getWidgetOrderFunction = function () {
            return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                var config, model, audioPlayerWidgetModel, factoryFunction, widgetOrder;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            config = {
                                kind: "block",
                                type: "audio-player",
                                sourceKey: media.permalinkKey,
                                controls: true,
                                autoplay: false
                            };
                            return [4 /*yield*/, this.audioPlayerModelBinder.nodeToModel(config)];
                        case 1:
                            model = _a.sent();
                            return [4 /*yield*/, this.audioPlayerModelBinder.modelToWidgetModel(model)];
                        case 2:
                            audioPlayerWidgetModel = _a.sent();
                            factoryFunction = function () {
                                var htmlElement = document.createElement("widget");
                                htmlElement.style.width = "100px";
                                htmlElement.style.height = "100px";
                                htmlElement["attachedModel"] = audioPlayerWidgetModel.model;
                                ko.applyBindingsToNode(htmlElement, { component: { name: audioPlayerWidgetModel.name, oncreate: audioPlayerWidgetModel.oncreate } });
                                return { element: htmlElement };
                            };
                            widgetOrder = {
                                title: "Audio recording",
                                createWidget: factoryFunction,
                                createModel: function () {
                                    return model;
                                }
                            };
                            resolve(widgetOrder);
                            return [2 /*return*/];
                    }
                });
            }); });
        };
        return {
            title: "Audio recording",
            description: media.description,
            getWidgetOrder: getWidgetOrderFunction
        };
    };
    AudioHandlers.prototype.getContentDescriptorFromDataTransfer = function (dataTransfer) {
        var _this = this;
        if (!this.matches(dataTransfer)) {
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
        var descriptor = {
            title: "Audio",
            description: dataTransfer.name,
            iconUrl: AudioHandlers.DefaultThumbnailUri,
            getWidgetOrder: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getWidgetOrderByConfig(droppedSourceUrl)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); },
            uploadables: [source]
        };
        return descriptor;
    };
    return AudioHandlers;
}(mediaHandlers_1.MediaHandlers));
AudioHandlers.DefaultAudioUri = "http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_640x360.m4v";
AudioHandlers.DefaultThumbnailUri = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%20standalone%3D%22no%22%3F%3E%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2270%22%20height%3D%2270%22%20version%3D%221.1%22%3E%3Crect%20width%3D%222%22%20height%3D%224%22%20x%3D%221%22%20y%3D%2233%22%20%2F%3E%3Crect%20width%3D%222%22%20height%3D%226%22%20x%3D%224%22%20y%3D%2232%22%20%2F%3E%3Crect%20width%3D%222%22%20height%3D%224%22%20x%3D%227%22%20y%3D%2233%22%20%2F%3E%3Crect%20width%3D%222%22%20height%3D%222%22%20x%3D%2210%22%20y%3D%2234%22%20%2F%3E%3Crect%20width%3D%222%22%20height%3D%228%22%20x%3D%2213%22%20y%3D%2231%22%20%2F%3E%3Crect%20width%3D%222%22%20height%3D%2228%22%20x%3D%2216%22%20y%3D%2221%22%20%2F%3E%3Crect%20width%3D%222%22%20height%3D%2240%22%20x%3D%2219%22%20y%3D%2215%22%20%2F%3E%3Crect%20width%3D%222%22%20height%3D%2230%22%20x%3D%2222%22%20y%3D%2220%22%20%2F%3E%3Crect%20width%3D%222%22%20height%3D%2262%22%20x%3D%2225%22%20y%3D%224%22%20%2F%3E%3Crect%20width%3D%222%22%20height%3D%2246%22%20x%3D%2228%22%20y%3D%2212%22%20%2F%3E%3Crect%20width%3D%222%22%20height%3D%2254%22%20x%3D%2231%22%20y%3D%228%22%20%2F%3E%3Crect%20width%3D%222%22%20height%3D%2238%22%20x%3D%2234%22%20y%3D%2216%22%20%2F%3E%3Crect%20width%3D%222%22%20height%3D%2214%22%20x%3D%2237%22%20y%3D%2228%22%20%2F%3E%3Crect%20width%3D%222%22%20height%3D%226%22%20x%3D%2240%22%20y%3D%2232%22%20%2F%3E%3Crect%20width%3D%222%22%20height%3D%2228%22%20x%3D%2243%22%20y%3D%2221%22%20%2F%3E%3Crect%20width%3D%222%22%20height%3D%2236%22%20x%3D%2246%22%20y%3D%2217%22%20%2F%3E%3Crect%20width%3D%222%22%20height%3D%2224%22%20x%3D%2249%22%20y%3D%2223%22%20%2F%3E%3Crect%20width%3D%222%22%20height%3D%228%22%20x%3D%2252%22%20y%3D%2231%22%20%2F%3E%3Crect%20width%3D%222%22%20height%3D%222%22%20x%3D%2255%22%20y%3D%2234%22%20%2F%3E%3Crect%20width%3D%222%22%20height%3D%228%22%20x%3D%2258%22%20y%3D%2231%22%20%2F%3E%3Crect%20width%3D%222%22%20height%3D%224%22%20x%3D%2261%22%20y%3D%2233%22%20%2F%3E%3Crect%20width%3D%222%22%20height%3D%224%22%20x%3D%2264%22%20y%3D%2233%22%20%2F%3E%3Crect%20width%3D%222%22%20height%3D%222%22%20x%3D%2267%22%20y%3D%2234%22%20%2F%3E%3C%2Fsvg%3E%0A";
AudioHandlers.ThumbnailTimeOffset = 60;
exports.AudioHandlers = AudioHandlers;
