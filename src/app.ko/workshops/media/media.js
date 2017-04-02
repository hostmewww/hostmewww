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
var mediaItem_1 = require("../../../app.ko/workshops/media/mediaItem");
var DeleteKeyCode = 46;
var MediaWorkshop = (function () {
    function MediaWorkshop(mediaService, permalinkService, viewManager, layoutEditor, dropHandlers) {
        this.mediaService = mediaService;
        this.permalinkService = permalinkService;
        this.viewManager = viewManager;
        this.layoutEditor = layoutEditor;
        this.dropHandlers = dropHandlers;
        this.searchMedia = this.searchMedia.bind(this);
        this.uploadMedia = this.uploadMedia.bind(this);
        this.onMediaUploaded = this.onMediaUploaded.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.selectMedia = this.selectMedia.bind(this);
        this.keydown = this.keydown.bind(this);
        this.working = ko.observable(true);
        this.mediaItems = ko.observableArray();
        this.searchPattern = ko.observable();
        this.selectedMediaItem = ko.observable();
        this.searchPattern.subscribe(this.searchMedia);
        this.searchMedia();
    }
    MediaWorkshop.prototype.searchMedia = function (searchPattern) {
        if (searchPattern === void 0) { searchPattern = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var drophandlers, result, mediaFiles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.working(true);
                        drophandlers = this.dropHandlers;
                        result = [];
                        this.mediaItems(result);
                        return [4 /*yield*/, this.mediaService.search(searchPattern)];
                    case 1:
                        mediaFiles = _a.sent();
                        mediaFiles.forEach(function (media) { return __awaiter(_this, void 0, void 0, function () {
                            var i, handler, descriptor, order, mediaItem;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        i = 0;
                                        _a.label = 1;
                                    case 1:
                                        if (!(i < drophandlers.length)) return [3 /*break*/, 4];
                                        handler = drophandlers[i];
                                        if (!handler.getContentDescriptorFromMedia) {
                                            return [3 /*break*/, 3];
                                        }
                                        descriptor = handler.getContentDescriptorFromMedia(media);
                                        if (!(descriptor && descriptor.getWidgetOrder)) return [3 /*break*/, 3];
                                        return [4 /*yield*/, descriptor.getWidgetOrder()];
                                    case 2:
                                        order = _a.sent();
                                        mediaItem = new mediaItem_1.MediaItem(media);
                                        mediaItem.widgetOrder = order;
                                        this.mediaItems.push(mediaItem);
                                        _a.label = 3;
                                    case 3:
                                        i++;
                                        return [3 /*break*/, 1];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); });
                        this.working(false);
                        return [2 /*return*/];
                }
            });
        });
    };
    MediaWorkshop.prototype.onMediaUploaded = function () {
        this.searchMedia();
    };
    MediaWorkshop.prototype.uploadMedia = function () {
        return __awaiter(this, void 0, void 0, function () {
            var files, uploadPromises, index, file, content, uploadPromise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.viewManager.openUploadDialog()];
                    case 1:
                        files = _a.sent();
                        this.working(true);
                        uploadPromises = [];
                        index = 0;
                        _a.label = 2;
                    case 2:
                        if (!(index < files.length)) return [3 /*break*/, 5];
                        file = files[index];
                        return [4 /*yield*/, Utils.readFileAsByteArray(file)];
                    case 3:
                        content = _a.sent();
                        uploadPromise = this.mediaService.createMedia(file.name, content);
                        this.viewManager.addPromiseProgressIndicator(uploadPromise, "Media library", "Uploading " + file.name + "...");
                        uploadPromises.push(uploadPromise);
                        _a.label = 4;
                    case 4:
                        index++;
                        return [3 /*break*/, 2];
                    case 5: return [4 /*yield*/, Promise.all(uploadPromises)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.searchMedia()];
                    case 7:
                        _a.sent();
                        this.working(false);
                        return [2 /*return*/];
                }
            });
        });
    };
    MediaWorkshop.prototype.deleteMedia = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.working(true);
                        return [4 /*yield*/, this.mediaService.deleteMedia(this.selectedMediaItem().media)];
                    case 1:
                        _a.sent();
                        this.selectedMediaItem(null);
                        return [4 /*yield*/, this.searchMedia()];
                    case 2:
                        _a.sent();
                        this.viewManager.notifySuccess("Media library", "File deleted");
                        this.working(false);
                        return [2 /*return*/];
                }
            });
        });
    };
    MediaWorkshop.prototype.selectMedia = function (mediaItem) {
        mediaItem.hasFocus(true);
        this.selectedMediaItem(mediaItem);
    };
    MediaWorkshop.prototype.onDragStart = function (item) {
        this.viewManager.foldEverything();
        var widgetElement = item.widgetOrder.createWidget().element;
        item.element = widgetElement;
        return widgetElement;
    };
    MediaWorkshop.prototype.onDragEnd = function (item) {
        this.layoutEditor.onWidgetDragEnd(item, item.element);
        this.layoutEditor.applyBindingsToWidget(item.element);
    };
    MediaWorkshop.prototype.keydown = function (item, event) {
        if (event.keyCode === DeleteKeyCode) {
            this.deleteMedia();
        }
    };
    return MediaWorkshop;
}());
exports.MediaWorkshop = MediaWorkshop;
