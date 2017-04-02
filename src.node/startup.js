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
var Paths = require("./paths");
var domino = require("domino");
global.fs = require("fs");
global.path = require("path");
global.XMLHttpRequest = require("xhr2");
global.ko = require("knockout");
global.firebase = require("firebase");
require("setimmediate");
require("detect-browser");
var components_common_1 = require("./../src/registrations/components.common");
var components_widgets_1 = require("./../src/registrations/components.widgets");
var knockout_loaders_1 = require("./knockout.loaders");
var knockout_common_1 = require("./../src/registrations/knockout.common");
var knockout_widgets_1 = require("./../src/registrations/knockout.widgets");
var components_node_1 = require("./components.node");
var publishing_registrations_1 = require("./../src/app/publishing/publishing.registrations");
var inversifyInjector_1 = require("./../src/app/injection/inversifyInjector");
var registrations_firebase_1 = require("./../src/app/firebase/registrations.firebase");
var registrations_github_1 = require("./../src/app/github/registrations.github");
var ISettingsProvider_1 = require("./../src/app/configuration/ISettingsProvider");
var staticSettingsProvider_1 = require("./staticSettingsProvider");
function publish() {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        function LoadSettings(injector) {
            return __awaiter(this, void 0, void 0, function () {
                var siteService, settings, settingsProvider;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            siteService = injector.resolve("siteService");
                            return [4 /*yield*/, siteService.getSiteSettings()];
                        case 1:
                            settings = _a.sent();
                            settingsProvider = injector.resolve("settingsProvider");
                            settingsProvider.setSetting(ISettingsProvider_1.Settings.Config.Gtm, settings && settings.config && settings.config.gtm);
                            settingsProvider.setSetting(ISettingsProvider_1.Settings.Config.Intercom, settings && settings.config && settings.config.intercom);
                            return [2 /*return*/];
                    }
                });
            });
        }
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    var indexFilePath = Paths.inputBasePath + "/assets/index.html";
                    global.fs.readFile(indexFilePath, "utf8", function (error, html) { return __awaiter(_this, void 0, void 0, function () {
                        var slate, injector, use, publisher, error_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    global.window = domino.createWindow(html);
                                    global.document = window.document;
                                    global.navigator = window.navigator;
                                    window["ReactDOM"] = require("react-dom");
                                    window["Immutable"] = require("immutable");
                                    window["React"] = require("react");
                                    slate = require("./paperslate.min.js");
                                    global.PaperSlate = slate.PaperSlate;
                                    injector = new inversifyInjector_1.InversifyInjector();
                                    use = function (module) {
                                        module.register(injector);
                                    };
                                    use(new components_common_1.ComponentRegistrationCommon());
                                    use(new components_widgets_1.ComponentRegistrationWidgets());
                                    use(new knockout_common_1.KnockoutRegistrationCommon());
                                    use(new knockout_loaders_1.KnockoutRegistrationLoaders());
                                    use(new knockout_widgets_1.KnockoutRegistrationWidgets());
                                    use(new registrations_firebase_1.FirebaseRegistration());
                                    injector.bindSingleton("settingsProvider", staticSettingsProvider_1.StaticSettingsProvider);
                                    use(new registrations_github_1.GithubRegistration());
                                    use(new components_node_1.ComponentRegistrationNode());
                                    use(new publishing_registrations_1.PublishingRegistration());
                                    injector.resolve("widgetBindingHandler");
                                    return [4 /*yield*/, LoadSettings(injector)];
                                case 1:
                                    _a.sent();
                                    ko.applyBindings();
                                    publisher = injector.resolve("githubPublisher");
                                    _a.label = 2;
                                case 2:
                                    _a.trys.push([2, 4, , 5]);
                                    console.log(new Date());
                                    return [4 /*yield*/, publisher.publish()];
                                case 3:
                                    _a.sent();
                                    console.log(new Date());
                                    return [3 /*break*/, 5];
                                case 4:
                                    error_1 = _a.sent();
                                    console.log(error_1);
                                    return [3 /*break*/, 5];
                                case 5:
                                    resolve();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                })];
        });
    });
}
exports.publish = publish;
publish();
