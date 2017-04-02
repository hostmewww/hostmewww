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
var dataTransferTypes_1 = require("../../../app/editing/dataTransferTypes");
var dropBucketItem_1 = require("../../../app.ko/workshops/dropbucket/dropBucketItem");
var DropBucket = (function () {
    function DropBucket(globalEventHandler, layoutEditor, mediaService, dropHandlers, viewManager, httpClient) {
        this.layoutEditor = layoutEditor;
        this.mediaService = mediaService;
        this.viewManager = viewManager;
        this.httpClient = httpClient;
        this.onDragDrop = this.onDragDrop.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onPaste = this.onPaste.bind(this);
        this.addPendingContent = this.addPendingContent.bind(this);
        this.uploadContentAsMedia = this.uploadContentAsMedia.bind(this);
        this.discardDroppedContent = this.discardDroppedContent.bind(this);
        this.handleDroppedContent = this.handleDroppedContent.bind(this);
        this.handleUnknownContent = this.handleUnknownContent.bind(this);
        globalEventHandler.addDragDropListener(this.onDragDrop);
        globalEventHandler.addPasteListener(this.onPaste);
        this.dropHandlers = dropHandlers;
        this.droppedItems = ko.observableArray();
    }
    DropBucket.prototype.isDraggableAttached = function (event) {
        var text = event.dataTransfer.getData("text");
        return text != null && text.startsWith(dataTransferTypes_1.DataTransferTypes.widget);
    };
    DropBucket.prototype.addPendingContent = function (item) {
        this.droppedItems.push(item);
    };
    DropBucket.prototype.handleDroppedContent = function (contentDescriptor) {
        return __awaiter(this, void 0, void 0, function () {
            var dropBucketItem, widgetOrder, i, uploadable;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dropBucketItem = new dropBucketItem_1.DropBucketItem();
                        dropBucketItem.title = contentDescriptor.title;
                        dropBucketItem.description = contentDescriptor.description;
                        if (!contentDescriptor.getWidgetOrder) return [3 /*break*/, 2];
                        return [4 /*yield*/, contentDescriptor.getWidgetOrder()];
                    case 1:
                        widgetOrder = _a.sent();
                        dropBucketItem.widgetOrder(widgetOrder);
                        _a.label = 2;
                    case 2:
                        dropBucketItem.thumbnailUrl(contentDescriptor.iconUrl);
                        if (contentDescriptor.getThumbnailUrl) {
                            contentDescriptor.getThumbnailUrl().then(function (thumbnailUrl) {
                                dropBucketItem.previewUrl(thumbnailUrl);
                                dropBucketItem.thumbnailUrl(thumbnailUrl);
                            });
                        }
                        if (contentDescriptor.uploadables && contentDescriptor.uploadables.length) {
                            for (i = 0; i < contentDescriptor.uploadables.length; i++) {
                                uploadable = contentDescriptor.uploadables[i];
                                dropBucketItem.uploadables.push(uploadable);
                            }
                        }
                        this.addPendingContent(dropBucketItem);
                        return [2 /*return*/];
                }
            });
        });
    };
    DropBucket.prototype.onDragDrop = function (event) {
        if (this.isDraggableAttached(event)) {
            return;
        }
        this.droppedItems.removeAll();
        var dataTransfer = event.dataTransfer;
        var items;
        if (dataTransfer.files.length > 0) {
            items = [];
            for (var i = 0; i < dataTransfer.files.length; i++) {
                items.push({
                    source: dataTransfer.files[i],
                    name: dataTransfer.files[i].name,
                    mimeType: dataTransfer.files[i].type
                });
            }
        }
        else {
            var data = dataTransfer.getData("url") || dataTransfer.getData("text");
            var parts = data.split("/");
            items = [{
                    source: data,
                    name: parts[parts.length - 1]
                }];
        }
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            var handled = false;
            var contentDescriptor = null;
            var j = 0;
            while (contentDescriptor === null && j < this.dropHandlers.length) {
                contentDescriptor = this.dropHandlers[j].getContentDescriptorFromDataTransfer(item);
                if (contentDescriptor) {
                    this.handleDroppedContent(contentDescriptor);
                    handled = true;
                }
                j++;
            }
            if (!handled) {
                this.handleUnknownContent(dataTransfer);
            }
        }
    };
    DropBucket.prototype.onPaste = function (event) {
        this.droppedItems.removeAll();
        var text = event.clipboardData.getData("text");
        var i = 0;
        var contentDescriptor = null;
        while (contentDescriptor === null && i < this.dropHandlers.length) {
            contentDescriptor = this.dropHandlers[i].getContentDescriptorFromDataTransfer({
                source: text,
                name: text.split('/').pop().split('?')[0]
            });
            if (contentDescriptor) {
                this.handleDroppedContent(contentDescriptor);
            }
            i++;
        }
    };
    DropBucket.prototype.handleUnknownContent = function (dataTransfer) {
        var title;
        var description = "";
        if (dataTransfer.files.length > 1) {
            title = dataTransfer.files.length + " files";
        }
        else if (dataTransfer.files.length > 0) {
            title = "File";
            description = dataTransfer.files[0].name;
        }
        else {
            title = "Piece of text";
        }
        var dropBucketItem = new dropBucketItem_1.DropBucketItem();
        var uploadables = [];
        for (var i = 0; i < dataTransfer.files.length; i++) {
            uploadables.push(dataTransfer.files[i]);
        }
        dropBucketItem.title = title;
        dropBucketItem.description = description;
        dropBucketItem.uploadables(uploadables);
        this.addPendingContent(dropBucketItem);
    };
    DropBucket.prototype.onDragStart = function (item) {
        item.widgetFactoryResult = item.widgetOrder().createWidget();
        var widgetElement = item.widgetFactoryResult.element;
        this.droppedItems.remove(item);
        return widgetElement;
    };
    DropBucket.prototype.onDragEnd = function (dropbucketItem) {
        return __awaiter(this, void 0, void 0, function () {
            var uploadables;
            return __generator(this, function (_a) {
                this.layoutEditor.onWidgetDragEnd(dropbucketItem, dropbucketItem.widgetFactoryResult.element);
                this.layoutEditor.applyBindingsToWidget(dropbucketItem.widgetFactoryResult.element);
                this.droppedItems.remove(dropbucketItem);
                uploadables = dropbucketItem.uploadables();
                if (uploadables && uploadables.length > 0) {
                    this.uploadContentAsMedia(dropbucketItem);
                    this.droppedItems.remove(dropbucketItem);
                }
                return [2 /*return*/];
            });
        });
    };
    DropBucket.prototype.uploadContentAsMedia = function (dropbucketItem) {
        var _this = this;
        var uploadables = dropbucketItem.uploadables();
        this.droppedItems.remove(dropbucketItem);
        uploadables.forEach(function (uploadable) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            var uploadPromise, name_1, content, onMediaUploadedCallback;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof uploadable === "string")) return [3 /*break*/, 1];
                        name_1 = uploadable.split("/").pop().split("?")[0];
                        uploadPromise = Utils
                            .readUrlAsBlob(uploadable)
                            .sequence(function (blob) { return _this.mediaService.createMedia(name_1, blob); });
                        this.viewManager.addPromiseProgressIndicator(uploadPromise, "Media library", "Uploading " + uploadable + "...");
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, Utils.readFileAsByteArray(uploadable)];
                    case 2:
                        content = _a.sent();
                        uploadPromise = this.mediaService.createMedia(uploadable.name, content);
                        this.viewManager.addPromiseProgressIndicator(uploadPromise, "Media library", "Uploading " + uploadable.name + "...");
                        _a.label = 3;
                    case 3:
                        onMediaUploadedCallback = dropbucketItem.widgetFactoryResult.onMediaUploadedCallback;
                        if (onMediaUploadedCallback && typeof onMediaUploadedCallback === "function") {
                            uploadPromise.then(function (createdMedia) { return onMediaUploadedCallback(createdMedia); });
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    };
    DropBucket.prototype.discardDroppedContent = function () {
        this.droppedItems.removeAll();
    };
    return DropBucket;
}());
exports.DropBucket = DropBucket;
