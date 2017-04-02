"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IHtmlEditor_1 = require("../../../app/editing/IHtmlEditor");
var SlateHtmlEditor = (function () {
    function SlateHtmlEditor(eventManager) {
        this.disabled = false;
        this.eventManager = eventManager;
        if (PaperSlate && PaperSlate.default) {
            this.paperSlate = new PaperSlate.default.PaperSlate();
        }
        else {
            this.paperSlate = new PaperSlate();
        }
        this.getSelectionState = this.getSelectionState.bind(this);
        this.toggleBold = this.toggleBold.bind(this);
        this.mergeStyle = this.mergeStyle.bind(this);
        this.clearStyle = this.clearStyle.bind(this);
        this.toggleItalic = this.toggleItalic.bind(this);
        this.toggleUnderlined = this.toggleUnderlined.bind(this);
        this.toggleUl = this.toggleUl.bind(this);
        this.toggleOl = this.toggleOl.bind(this);
        this.toggleP = this.toggleP.bind(this);
        this.toggleH1 = this.toggleH1.bind(this);
        this.toggleH2 = this.toggleH2.bind(this);
        this.toggleH3 = this.toggleH3.bind(this);
        this.toggleH4 = this.toggleH4.bind(this);
        this.toggleH5 = this.toggleH5.bind(this);
        this.toggleH6 = this.toggleH6.bind(this);
        this.toggleCode = this.toggleCode.bind(this);
        this.toggleQuote = this.toggleQuote.bind(this);
        this.toggleAlignLeft = this.toggleAlignLeft.bind(this);
        this.toggleAlignRight = this.toggleAlignRight.bind(this);
        this.toggleAlignCenter = this.toggleAlignCenter.bind(this);
        this.toggleJustify = this.toggleJustify.bind(this);
        this.getHyperlink = this.getHyperlink.bind(this);
        this.setHyperlink = this.setHyperlink.bind(this);
        this.removeHyperlink = this.removeHyperlink.bind(this);
        this.disable = this.disable.bind(this);
        this.renderToContainer = this.renderToContainer.bind(this);
        this.setInitialState = this.setInitialState.bind(this);
    }
    SlateHtmlEditor.prototype.getSelectionState = function () {
        var state = this.paperSlate.getSelectionState();
        state.normal = !state.h1 && !state.h2 && !state.h3 && !state.h4 &&
            !state.h5 && !state.h6 && !state.code && !state.quote;
        return state;
    };
    SlateHtmlEditor.prototype.getState = function () {
        var state = this.paperSlate.getState();
        return state;
    };
    SlateHtmlEditor.prototype.updateState = function (state) {
        this.paperSlate.updateState(state);
    };
    SlateHtmlEditor.prototype.clearStyle = function () {
        this.paperSlate.clearStyle();
        this.eventManager.dispatchEvent(IHtmlEditor_1.HtmlEditorEvents.onSelectionChange);
    };
    SlateHtmlEditor.prototype.toggleBold = function () {
        this.paperSlate.toggleBold();
        this.eventManager.dispatchEvent(IHtmlEditor_1.HtmlEditorEvents.onSelectionChange);
    };
    SlateHtmlEditor.prototype.mergeStyle = function (style) {
        this.paperSlate.mergeStyle(style);
        this.eventManager.dispatchEvent(IHtmlEditor_1.HtmlEditorEvents.onSelectionChange);
    };
    SlateHtmlEditor.prototype.toggleItalic = function () {
        this.paperSlate.toggleItalic();
        this.eventManager.dispatchEvent(IHtmlEditor_1.HtmlEditorEvents.onSelectionChange);
    };
    SlateHtmlEditor.prototype.toggleUnderlined = function () {
        this.paperSlate.toggleUnderlined();
        this.eventManager.dispatchEvent(IHtmlEditor_1.HtmlEditorEvents.onSelectionChange);
    };
    SlateHtmlEditor.prototype.toggleUl = function () {
        this.paperSlate.toggleUl();
        this.eventManager.dispatchEvent(IHtmlEditor_1.HtmlEditorEvents.onSelectionChange);
    };
    SlateHtmlEditor.prototype.toggleOl = function () {
        this.paperSlate.toggleOl();
        this.eventManager.dispatchEvent(IHtmlEditor_1.HtmlEditorEvents.onSelectionChange);
    };
    SlateHtmlEditor.prototype.toggleP = function () {
        this.paperSlate.toggleP();
        this.eventManager.dispatchEvent(IHtmlEditor_1.HtmlEditorEvents.onSelectionChange);
    };
    SlateHtmlEditor.prototype.toggleH1 = function () {
        this.paperSlate.toggleH1();
        this.eventManager.dispatchEvent(IHtmlEditor_1.HtmlEditorEvents.onSelectionChange);
    };
    SlateHtmlEditor.prototype.toggleH2 = function () {
        this.paperSlate.toggleH2();
        this.eventManager.dispatchEvent(IHtmlEditor_1.HtmlEditorEvents.onSelectionChange);
    };
    SlateHtmlEditor.prototype.toggleH3 = function () {
        this.paperSlate.toggleH3();
        this.eventManager.dispatchEvent(IHtmlEditor_1.HtmlEditorEvents.onSelectionChange);
    };
    SlateHtmlEditor.prototype.toggleH4 = function () {
        this.paperSlate.toggleH4();
        this.eventManager.dispatchEvent(IHtmlEditor_1.HtmlEditorEvents.onSelectionChange);
    };
    SlateHtmlEditor.prototype.toggleH5 = function () {
        this.paperSlate.toggleH5();
        this.eventManager.dispatchEvent(IHtmlEditor_1.HtmlEditorEvents.onSelectionChange);
    };
    SlateHtmlEditor.prototype.toggleH6 = function () {
        this.paperSlate.toggleH6();
        this.eventManager.dispatchEvent(IHtmlEditor_1.HtmlEditorEvents.onSelectionChange);
    };
    SlateHtmlEditor.prototype.setHyperlink = function (data) {
        this.paperSlate.setHyperlink(data);
    };
    SlateHtmlEditor.prototype.getHyperlink = function () {
        return this.paperSlate.getHyperlink();
    };
    SlateHtmlEditor.prototype.removeHyperlink = function () {
        this.paperSlate.removeHyperlink();
    };
    SlateHtmlEditor.prototype.toggleQuote = function () {
        this.paperSlate.toggleQuote();
        this.eventManager.dispatchEvent(IHtmlEditor_1.HtmlEditorEvents.onSelectionChange);
    };
    SlateHtmlEditor.prototype.toggleCode = function () {
        this.paperSlate.toggleCode();
        this.eventManager.dispatchEvent(IHtmlEditor_1.HtmlEditorEvents.onSelectionChange);
    };
    SlateHtmlEditor.prototype.toggleAlignLeft = function () {
        this.paperSlate.toggleAlignLeft();
        this.eventManager.dispatchEvent(IHtmlEditor_1.HtmlEditorEvents.onSelectionChange);
    };
    SlateHtmlEditor.prototype.toggleAlignCenter = function () {
        this.paperSlate.toggleAlignCenter();
        this.eventManager.dispatchEvent(IHtmlEditor_1.HtmlEditorEvents.onSelectionChange);
    };
    SlateHtmlEditor.prototype.toggleAlignRight = function () {
        this.paperSlate.toggleAlignRight();
        this.eventManager.dispatchEvent(IHtmlEditor_1.HtmlEditorEvents.onSelectionChange);
    };
    SlateHtmlEditor.prototype.toggleJustify = function () {
        this.paperSlate.toggleJustify();
        this.eventManager.dispatchEvent(IHtmlEditor_1.HtmlEditorEvents.onSelectionChange);
    };
    SlateHtmlEditor.prototype.resetToNormal = function () {
        this.paperSlate.resetToNormal();
        this.eventManager.dispatchEvent(IHtmlEditor_1.HtmlEditorEvents.onSelectionChange);
    };
    SlateHtmlEditor.prototype.enable = function () {
        this.disabled = false;
        this.paperSlate.enable();
        this.eventManager.addEventListener("onEscape", this.disable);
    };
    SlateHtmlEditor.prototype.disable = function () {
        this.disabled = true;
        this.paperSlate.disable();
        this.eventManager.removeEventListener("onEscape", this.disable);
    };
    SlateHtmlEditor.prototype.addSelectionChangeListener = function (callback) {
        this.paperSlate.addSelectionChangeListener(callback);
    };
    SlateHtmlEditor.prototype.removeSelectionChangeListener = function (callback) {
        this.paperSlate.removeSelectionChangeListener(callback);
    };
    SlateHtmlEditor.prototype.addDisabledListener = function (callback) {
        this.paperSlate.addDisabledListener(callback);
    };
    SlateHtmlEditor.prototype.removeDisabledListener = function (callback) {
        this.paperSlate.removeDisabledListener(callback);
    };
    SlateHtmlEditor.prototype.addEnabledListener = function (callback) {
        this.paperSlate.addEnabledListener(callback);
    };
    SlateHtmlEditor.prototype.removeEnabledListener = function (callback) {
        this.paperSlate.removeEnabledListener(callback);
    };
    SlateHtmlEditor.prototype.renderToContainer = function (element) {
        try {
            this.paperSlate = this.paperSlate.renderToContainer(element);
        }
        catch (error) {
            debugger;
        }
    };
    SlateHtmlEditor.prototype.setInitialState = function (state) {
        this.paperSlate.setInitialState(state);
    };
    return SlateHtmlEditor;
}());
exports.SlateHtmlEditor = SlateHtmlEditor;
