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
var HyperlinkSelector = (function () {
    function HyperlinkSelector(permalinkService, resourcePickers, selectedHyperlink) {
        this.permalinkService = permalinkService;
        this.resourcePickers = resourcePickers;
        this.selectedHyperlink = selectedHyperlink;
        this.updateHyperlinkState = this.updateHyperlinkState.bind(this);
        this.onResourceSelected = this.onResourceSelected.bind(this);
        this.hyperlink = ko.observable();
        this.selectedResourcePicker = ko.observable(null);
        this.selectedResourcePicker.subscribe(this.onResourcePickerChange.bind(this));
        if (selectedHyperlink) {
            this.updateHyperlinkState();
            selectedHyperlink.subscribe(this.updateHyperlinkState.bind(this));
        }
    }
    HyperlinkSelector.prototype.onResourcePickerChange = function (resourcePicker) {
        if (resourcePicker === null) {
            this.hyperlink(null);
            this.selectedHyperlink(null);
        }
    };
    HyperlinkSelector.prototype.onResourceSelected = function (hyperlink) {
        this.hyperlink(hyperlink);
        if (this.selectedHyperlink) {
            this.selectedHyperlink(hyperlink);
        }
    };
    HyperlinkSelector.prototype.updateHyperlinkState = function () {
        return __awaiter(this, void 0, void 0, function () {
            var selectedHyperlink, resourcePicker, permalink_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        selectedHyperlink = this.selectedHyperlink();
                        if (!selectedHyperlink) {
                            this.selectedResourcePicker(null);
                            this.hyperlink(null);
                            return [2 /*return*/];
                        }
                        if (!selectedHyperlink.permalinkKey) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.permalinkService.getPermalinkByKey(selectedHyperlink.permalinkKey)];
                    case 1:
                        permalink_1 = _a.sent();
                        resourcePicker = this.resourcePickers.find(function (x) { return x.canHandleResource(permalink_1.targetKey); });
                        return [3 /*break*/, 3];
                    case 2:
                        if (selectedHyperlink.href) {
                            resourcePicker = this.resourcePickers.find(function (x) { return x.canHandleResource(selectedHyperlink.href); });
                        }
                        _a.label = 3;
                    case 3:
                        this.hyperlink(selectedHyperlink);
                        this.selectedResourcePicker(resourcePicker);
                        return [2 /*return*/];
                }
            });
        });
    };
    return HyperlinkSelector;
}());
exports.HyperlinkSelector = HyperlinkSelector;
