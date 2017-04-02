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
var VideoHandlers = (function () {
    function VideoHandlers(videoPlayerModelBinder) {
        this.videoPlayerModelBinder = videoPlayerModelBinder;
    }
    VideoHandlers.prototype.matches = function (filename) {
        if (filename && ![".webm", ".mp4", ".m4v", ".ogg", ".ogv", ".ogx", ".ogm"].any(function (e) { return filename.endsWith(e); })) {
            return false;
        }
        return true;
    };
    VideoHandlers.prototype.prepareWidgetOrder = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var model, widgetModel, factoryFunction, widgetOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.videoPlayerModelBinder.nodeToModel(config)];
                    case 1:
                        model = _a.sent();
                        return [4 /*yield*/, this.videoPlayerModelBinder.modelToWidgetModel(model)];
                    case 2:
                        widgetModel = _a.sent();
                        factoryFunction = function () {
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
                        };
                        widgetOrder = {
                            title: "Video player",
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
    VideoHandlers.prototype.getWidgetOrderByConfig = function (sourceUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = {
                            kind: "block",
                            type: "video-player",
                            sourceUrl: sourceUrl,
                            controls: true,
                            autoplay: false
                        };
                        return [4 /*yield*/, this.prepareWidgetOrder(config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VideoHandlers.prototype.getWidgetOrderByUrl = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getWidgetOrderByConfig(url)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VideoHandlers.prototype.getContentDescriptorFromMedia = function (media) {
        var _this = this;
        if (!this.matches(media.filename)) {
            return null;
        }
        var getWidgetOrderFunction = function () { return __awaiter(_this, void 0, void 0, function () {
            var config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = {
                            kind: "block",
                            type: "video-player",
                            sourceKey: media.permalinkKey,
                            controls: true,
                            autoplay: false
                        };
                        return [4 /*yield*/, this.prepareWidgetOrder(config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        return {
            title: "Video recording",
            iconUrl: VideoHandlers.DefaultThumbnailUri,
            description: media.description,
            getWidgetOrder: getWidgetOrderFunction
        };
    };
    VideoHandlers.prototype.getContentDescriptorFromDataTransfer = function (dataTransfer) {
        var _this = this;
        if (!this.matches(dataTransfer.name)) {
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
                        return [4 /*yield*/, this.buildThumbnail(droppedSourceUrl)];
                    case 1:
                        _a.apply(void 0, [_c.sent()]);
                        return [2 /*return*/];
                }
            });
        }); }); };
        var descriptor = {
            title: "Video recording",
            description: dataTransfer.name,
            getWidgetOrder: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getWidgetOrderByUrl(droppedSourceUrl)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); },
            iconUrl: VideoHandlers.DefaultThumbnailUri,
            getPreviewUrl: getThumbnailPromise,
            getThumbnailUrl: getThumbnailPromise,
            uploadables: [source]
        };
        return descriptor;
    };
    VideoHandlers.prototype.buildThumbnail = function (url) {
        return new Promise(function (resolve, reject) {
            var video = document.createElement("video");
            var canvas = document.createElement("canvas");
            video.src = url;
            video.currentTime = VideoHandlers.ThumbnailTimeOffset;
            video.addEventListener("loadedmetadata", function () {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
            }, false);
            var callback = function () {
                var context = canvas.getContext("2d");
                context.drawImage(video, 0, 0);
                try {
                    var url = canvas.toDataURL();
                    resolve(url);
                }
                catch (ex) {
                    resolve(VideoHandlers.DefaultThumbnailUri);
                }
                video.removeEventListener("timeupdate", callback, false);
            };
            video.addEventListener("timeupdate", callback, false);
        });
    };
    VideoHandlers.prototype.getWidgetOrder = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getWidgetOrderByConfig(VideoHandlers.DefaultVideoUri)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return VideoHandlers;
}());
VideoHandlers.DefaultVideoUri = "http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_640x360.m4v";
VideoHandlers.DefaultThumbnailUri = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjQ4cHgiIGhlaWdodD0iNDhweCIgdmlld0JveD0iMCAwIDQ4IDQ4Ij48ZyAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC41LCAwLjUpIj4KPHJlY3QgeD0iMiIgeT0iNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNDQ0NDQ0IiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgd2lkdGg9IjQ0IiBoZWlnaHQ9IjQwIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIi8+Cjxwb2x5Z29uIGRhdGEtY29sb3I9ImNvbG9yLTIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzQ0NDQ0NCIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHBvaW50cz0iJiMxMDsmIzk7MTcsMTQgMzMsMjQgMTcsMzQgIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIi8+CjwvZz48L3N2Zz4=";
VideoHandlers.ThumbnailTimeOffset = 60;
exports.VideoHandlers = VideoHandlers;
