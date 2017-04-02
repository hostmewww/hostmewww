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
var SettingsWorkshop = (function () {
    function SettingsWorkshop(mediaService, permalinkService, siteService, viewManager) {
        this.mediaService = mediaService;
        this.permalinkService = permalinkService;
        this.siteService = siteService;
        this.viewManager = viewManager;
        this.uploadFavicon = this.uploadFavicon.bind(this);
        this.working = ko.observable();
        this.loadSettings();
        this.title = ko.observable();
        this.description = ko.observable();
        this.keywords = ko.observable();
        this.gmapsApiKey = ko.observable();
        this.gtmContainerId = ko.observable();
        this.intercomAppId = ko.observable();
        this.faviconSourceKey = ko.observable();
    }
    SettingsWorkshop.prototype.loadSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var settings;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.working(true);
                        return [4 /*yield*/, this.siteService.getSiteSettings()];
                    case 1:
                        settings = _a.sent();
                        if (settings) {
                            this.title(settings.title);
                            this.description(settings.description);
                            this.keywords(settings.keywords);
                            if (settings.config) {
                                if (settings.config.googlemaps) {
                                    this.gmapsApiKey(settings.config.googlemaps.apiKey);
                                }
                                if (settings.config.gtm) {
                                    this.gtmContainerId(settings.config.gtm.containerId);
                                }
                                if (settings.config.intercom) {
                                    this.intercomAppId(settings.config.intercom.appId);
                                }
                            }
                        }
                        this.working(false);
                        this.title.subscribe(this.onSettingChange.bind(this));
                        this.description.subscribe(this.onSettingChange.bind(this));
                        this.keywords.subscribe(this.onSettingChange.bind(this));
                        this.gmapsApiKey.subscribe(this.onSettingChange.bind(this));
                        this.gtmContainerId.subscribe(this.onSettingChange.bind(this));
                        this.intercomAppId.subscribe(this.onSettingChange.bind(this));
                        this.faviconSourceKey.subscribe(this.onSettingChange.bind(this));
                        return [2 /*return*/];
                }
            });
        });
    };
    SettingsWorkshop.prototype.onSettingChange = function () {
        return __awaiter(this, void 0, void 0, function () {
            var config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = {
                            title: this.title(),
                            description: this.description(),
                            keywords: this.keywords(),
                            iconPermalinkKey: this.faviconSourceKey(),
                            config: {
                                intercom: {
                                    appId: this.intercomAppId()
                                },
                                gtm: {
                                    containerId: this.gtmContainerId(),
                                    dataLayerName: this.gtmContainerId()
                                },
                                googlemaps: {
                                    apiKey: this.gmapsApiKey()
                                }
                            }
                        };
                        return [4 /*yield*/, this.siteService.setSiteSettings(config)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SettingsWorkshop.prototype.uploadFavicon = function () {
        return __awaiter(this, void 0, void 0, function () {
            var files, index, file, content, media;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.viewManager.openUploadDialog()];
                    case 1:
                        files = _a.sent();
                        index = 0;
                        _a.label = 2;
                    case 2:
                        if (!(index < files.length)) return [3 /*break*/, 6];
                        file = files[index];
                        return [4 /*yield*/, Utils.readFileAsByteArray(file)];
                    case 3:
                        content = _a.sent();
                        return [4 /*yield*/, this.mediaService.createMedia(file.name, content)];
                    case 4:
                        media = _a.sent();
                        this.faviconSourceKey(media.media.permalinkKey);
                        _a.label = 5;
                    case 5:
                        index++;
                        return [3 /*break*/, 2];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return SettingsWorkshop;
}());
exports.SettingsWorkshop = SettingsWorkshop;
