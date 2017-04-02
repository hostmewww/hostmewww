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
var videoPlayerModel_1 = require("./models/videoPlayerModel");
var DefaultSourceUrl = "http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_640x360.m4v";
var VideoPlayerModelBinder = (function () {
    function VideoPlayerModelBinder(permalinkService, mediaService) {
        this.permalinkService = permalinkService;
        this.mediaService = mediaService;
    }
    VideoPlayerModelBinder.prototype.canHandleWidgetType = function (widgetType) {
        return widgetType === "video-player";
    };
    VideoPlayerModelBinder.prototype.canHandleWidgetModel = function (model) {
        return model instanceof videoPlayerModel_1.VideoPlayerModel;
    };
    VideoPlayerModelBinder.prototype.nodeToModel = function (videoPlayerNode) {
        return __awaiter(this, void 0, void 0, function () {
            var videoPlayerModel, permalink, media;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        videoPlayerModel = new videoPlayerModel_1.VideoPlayerModel();
                        videoPlayerModel.controls = videoPlayerNode.controls;
                        videoPlayerModel.autoplay = videoPlayerNode.autoplay;
                        if (!videoPlayerNode.sourceKey) return [3 /*break*/, 5];
                        videoPlayerModel.sourceKey = videoPlayerNode.sourceKey;
                        return [4 /*yield*/, this.permalinkService.getPermalinkByKey(videoPlayerNode.sourceKey)];
                    case 1:
                        permalink = _a.sent();
                        if (!!permalink) return [3 /*break*/, 2];
                        console.warn("Permalink with key " + videoPlayerNode.sourceKey + " not found.");
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.mediaService.getMediaByKey(permalink.targetKey)];
                    case 3:
                        media = _a.sent();
                        if (media) {
                            videoPlayerModel.sourceUrl = media.downloadUrl;
                        }
                        else {
                            console.warn("Media file with key " + permalink.targetKey + " not found, setting default image.");
                        }
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        if (videoPlayerNode.sourceUrl) {
                            videoPlayerModel.sourceUrl = videoPlayerNode.sourceUrl;
                        }
                        else {
                            videoPlayerModel.sourceUrl = DefaultSourceUrl;
                        }
                        _a.label = 6;
                    case 6: return [2 /*return*/, videoPlayerModel];
                }
            });
        });
    };
    VideoPlayerModelBinder.prototype.modelToWidgetModel = function (model, readonly) {
        if (readonly === void 0) { readonly = false; }
        return new Promise(function (resolve, reject) {
            var widgetModel = {
                name: "paper-video-player",
                params: {},
                setupViewModel: function (viewModel) {
                    viewModel.attachToModel(model);
                },
                nodeType: "video-player",
                model: model,
                editor: "video-player-editor",
                readonly: readonly
            };
            resolve(widgetModel);
        });
    };
    VideoPlayerModelBinder.prototype.getConfig = function (videoPlayerModel) {
        var videoConfig = {
            kind: "block",
            type: "video-player",
            sourceKey: videoPlayerModel.sourceKey,
            controls: videoPlayerModel.controls,
            autoplay: videoPlayerModel.autoplay
        };
        return videoConfig;
    };
    return VideoPlayerModelBinder;
}());
exports.VideoPlayerModelBinder = VideoPlayerModelBinder;
