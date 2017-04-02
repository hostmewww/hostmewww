"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hyperlinkModel_1 = require("../../../app/permalinks/hyperlinkModel");
var UrlResourcePicker = (function () {
    function UrlResourcePicker(permalinkService) {
        this.name = "Web URL";
        this.componentName = "url-selector";
        this.permalinkService = permalinkService;
    }
    UrlResourcePicker.prototype.canHandleResource = function (resource) {
        return resource.startsWith("http://") || resource.startsWith("https://");
    };
    UrlResourcePicker.prototype.getHyperlinkFromResource = function (url) {
        var hyperlinkModel = new hyperlinkModel_1.HyperlinkModel();
        hyperlinkModel.title = url;
        hyperlinkModel.href = url;
        hyperlinkModel.target = "_blank";
        return hyperlinkModel;
    };
    UrlResourcePicker.prototype.getHyperlinkFromUrl = function (url, target) {
        if (target === void 0) { target = "_blank"; }
        var hyperlinkModel = new hyperlinkModel_1.HyperlinkModel();
        hyperlinkModel.title = url;
        hyperlinkModel.target = target;
        hyperlinkModel.href = url;
        return hyperlinkModel;
    };
    UrlResourcePicker.prototype.getResourceFromHyperlink = function (hyperlink) {
        return hyperlink.href;
    };
    return UrlResourcePicker;
}());
exports.UrlResourcePicker = UrlResourcePicker;
