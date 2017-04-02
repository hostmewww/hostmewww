"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HtmlEditorProvider = (function () {
    function HtmlEditorProvider(eventManager) {
        var _this = this;
        eventManager.addEventListener("htmlEditorChanged", function (htmlEditor) { _this.htmlEditor = htmlEditor; });
        this.getCurrentHtmlEditor = this.getCurrentHtmlEditor.bind(this);
    }
    HtmlEditorProvider.prototype.getCurrentHtmlEditor = function () {
        return this.htmlEditor;
    };
    return HtmlEditorProvider;
}());
exports.HtmlEditorProvider = HtmlEditorProvider;
