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
var audioPlayerModel_1 = require("./models/audioPlayerModel");
var DefaultSourceUrl = "http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_640x360.m4v";
var AudioPlayerModelBinder = (function () {
    function AudioPlayerModelBinder(permalinkService, mediaService) {
        this.permalinkService = permalinkService;
        this.mediaService = mediaService;
    }
    AudioPlayerModelBinder.prototype.canHandleWidgetType = function (widgetType) {
        return widgetType === "audio-player";
    };
    AudioPlayerModelBinder.prototype.canHandleWidgetModel = function (model) {
        return model instanceof audioPlayerModel_1.AudioPlayerModel;
    };
    AudioPlayerModelBinder.prototype.nodeToModel = function (audioNode) {
        return __awaiter(this, void 0, void 0, function () {
            var audioModel, permalink, media;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        audioModel = new audioPlayerModel_1.AudioPlayerModel();
                        audioModel.controls = audioNode.controls;
                        audioModel.autoplay = audioNode.autoplay;
                        if (!audioNode.sourceKey) return [3 /*break*/, 3];
                        audioModel.sourceKey = audioNode.sourceKey;
                        return [4 /*yield*/, this.permalinkService.getPermalinkByKey(audioNode.sourceKey)];
                    case 1:
                        permalink = _a.sent();
                        return [4 /*yield*/, this.mediaService.getMediaByKey(permalink.targetKey)];
                    case 2:
                        media = _a.sent();
                        audioModel.sourceUrl = media.downloadUrl;
                        return [3 /*break*/, 4];
                    case 3:
                        if (audioNode.sourceUrl) {
                            audioModel.sourceUrl = audioNode.sourceUrl;
                        }
                        else {
                            audioModel.sourceUrl = DefaultSourceUrl;
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/, audioModel];
                }
            });
        });
    };
    AudioPlayerModelBinder.prototype.modelToWidgetModel = function (audioModel, readonly) {
        if (readonly === void 0) { readonly = false; }
        return __awaiter(this, void 0, void 0, function () {
            var audioWidgetModel;
            return __generator(this, function (_a) {
                audioWidgetModel = {
                    name: "paper-audio-player",
                    params: {},
                    setupViewModel: function (viewModel) {
                        viewModel.attachToModel(audioModel);
                    },
                    nodeType: "audio-player",
                    model: audioModel,
                    readonly: readonly
                };
                return [2 /*return*/, audioWidgetModel];
            });
        });
    };
    AudioPlayerModelBinder.prototype.getConfig = function (audioPlayerModel) {
        var audioConfig = {
            kind: "block",
            type: "audio-player",
            sourceKey: audioPlayerModel.sourceKey,
            sourceUrl: audioPlayerModel.sourceUrl,
            controls: audioPlayerModel.controls,
            autoplay: audioPlayerModel.autoplay
        };
        return audioConfig;
    };
    return AudioPlayerModelBinder;
}());
exports.AudioPlayerModelBinder = AudioPlayerModelBinder;
