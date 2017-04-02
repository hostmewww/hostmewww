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
var ISettingsProvider_1 = require("../../../app/configuration/ISettingsProvider");
var MapHandlers = (function () {
    function MapHandlers(settingsProvider, mapModelBinder) {
        this.settingsProvider = settingsProvider;
        this.mapModelBinder = mapModelBinder;
        this.init();
    }
    MapHandlers.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.settingsProvider.getSetting(ISettingsProvider_1.Settings.Config.GMaps)];
                    case 1:
                        config = _a.sent();
                        this.load(config["apiKey"]);
                        this.settingsProvider.onSettingChange(ISettingsProvider_1.Settings.Config.GMaps, function (config) {
                            GoogleMapsLoader.release(function () { _this.load(config["apiKey"]); });
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    MapHandlers.prototype.load = function (apiKey) {
        this.googleMapsKey = apiKey;
        GoogleMapsLoader.KEY = this.googleMapsKey;
        GoogleMapsLoader.load();
    };
    MapHandlers.prototype.prepareWidgetOrder = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var model, widgetModel, factoryFunction, widgetOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mapModelBinder.nodeToModel(config)];
                    case 1:
                        model = _a.sent();
                        return [4 /*yield*/, this.mapModelBinder.modelToWidgetModel(model)];
                    case 2:
                        widgetModel = _a.sent();
                        factoryFunction = function () {
                            var htmlElement = document.createElement("widget");
                            htmlElement.style.width = "150px";
                            htmlElement.style.height = "100px";
                            ko.applyBindingsToNode(htmlElement, { widgetH: widgetModel });
                            htmlElement["attachedModel"] = widgetModel.model;
                            return { element: htmlElement };
                        };
                        widgetOrder = {
                            title: "Map",
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
    MapHandlers.prototype.getWidgetOrderByConfig = function (location) {
        return __awaiter(this, void 0, void 0, function () {
            var config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = {
                            kind: "block",
                            type: "map",
                            location: location,
                        };
                        return [4 /*yield*/, this.prepareWidgetOrder(config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MapHandlers.prototype.getWidgetOrder = function () {
        return Promise.resolve(this.getWidgetOrderByConfig("Seattle, WA"));
    };
    MapHandlers.prototype.getContentDescriptorFromDataTransfer = function (dataTransfer) {
        var _this = this;
        var mapConfig = this.parseDataTransfer(dataTransfer);
        if (!mapConfig) {
            return null;
        }
        var getThumbnailPromise = function () { return Promise.resolve("https://maps.googleapis.com/maps/api/staticmap?center=" + mapConfig.location + "&format=jpg&size=130x90&key=" + _this.googleMapsKey); };
        var descriptor = {
            title: "Map",
            description: mapConfig.location,
            getWidgetOrder: function () { return Promise.resolve(_this.getWidgetOrderByConfig(mapConfig.location)); },
            getThumbnailUrl: getThumbnailPromise
        };
        return descriptor;
    };
    MapHandlers.prototype.parseDataTransfer = function (dataTransfer) {
        var source = dataTransfer.source;
        if (source && typeof source === "string") {
            var url = source.toLowerCase();
            if (url.startsWith("https://www.google.com/maps/") || url.startsWith("http://www.google.com/maps/")) {
                var location;
                var match = new RegExp("/place/([^/]+)").exec(url);
                if (match && match.length > 1) {
                    location = match[1].replaceAll("+", " ");
                }
                else {
                    match = new RegExp("/@([^/]+)").exec(url);
                    if (match && match.length > 1) {
                        var locationParts = match[1].split(",");
                        location = locationParts.slice(0, 2).join(",");
                    }
                }
                return location ? { location: location, kind: "map" } : null;
            }
        }
        return null;
    };
    return MapHandlers;
}());
exports.MapHandlers = MapHandlers;
