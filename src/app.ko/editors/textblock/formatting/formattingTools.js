"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FormattingTools = (function () {
    function FormattingTools(htmlEditorProvider, eventManager) {
        var _this = this;
        this.htmlEditorProvider = htmlEditorProvider;
        this.updateFormattingState = this.updateFormattingState.bind(this);
        this.bold = ko.observable();
        this.italic = ko.observable();
        this.underlined = ko.observable();
        this.ul = ko.observable();
        this.ol = ko.observable();
        this.pre = ko.observable();
        this.style = ko.observable("Normal");
        this.styled = ko.observable();
        this.alignedLeft = ko.observable();
        this.alignedCenter = ko.observable();
        this.alignedRight = ko.observable();
        this.justified = ko.observable();
        this.color = ko.observable();
        var htmlEditor = htmlEditorProvider.getCurrentHtmlEditor();
        eventManager.addEventListener("htmlEditorChanged", function (newHtmlEditor) {
            if (htmlEditor) {
                htmlEditor.removeSelectionChangeListener(_this.updateFormattingState);
            }
            newHtmlEditor.addSelectionChangeListener(_this.updateFormattingState);
        });
    }
    FormattingTools.prototype.updateFormattingState = function () {
        var selectionState = this.htmlEditorProvider.getCurrentHtmlEditor().getSelectionState();
        this.bold(selectionState.bold);
        this.italic(selectionState.italic);
        this.underlined(selectionState.underlined);
        this.ul(selectionState.ul);
        this.ol(selectionState.ol);
        this.pre(selectionState.code);
        this.alignedLeft(selectionState.alignedLeft);
        this.alignedCenter(selectionState.alignedCenter);
        this.alignedRight(selectionState.alignedRight);
        this.justified(selectionState.justified);
        this.styled(selectionState.style != null);
        this.setColor = this.setColor.bind(this);
        if (selectionState.style && selectionState.style.color) {
            this.color(selectionState.style.color);
        }
        else {
            this.color(null);
        }
        if (selectionState.normal) {
            this.style("Normal");
        }
        else if (selectionState.h1) {
            this.style("Heading 1");
        }
        else if (selectionState.h2) {
            this.style("Heading 2");
        }
        else if (selectionState.h3) {
            this.style("Heading 3");
        }
        else if (selectionState.h4) {
            this.style("Heading 4");
        }
        else if (selectionState.h5) {
            this.style("Heading 5");
        }
        else if (selectionState.h6) {
            this.style("Heading 6");
        }
        else if (selectionState.quote) {
            this.style("Quote");
        }
        else if (selectionState.code) {
            this.style("Code snippet");
        }
    };
    FormattingTools.prototype.toggleBold = function () {
        this.htmlEditorProvider.getCurrentHtmlEditor().toggleBold();
        this.updateFormattingState();
    };
    FormattingTools.prototype.toggleItalic = function () {
        this.htmlEditorProvider.getCurrentHtmlEditor().toggleItalic();
        this.updateFormattingState();
    };
    FormattingTools.prototype.setColor = function (color) {
        if (color) {
            this.htmlEditorProvider.getCurrentHtmlEditor().mergeStyle({ color: color });
        }
        else {
            this.htmlEditorProvider.getCurrentHtmlEditor().clearStyle();
        }
        this.updateFormattingState();
    };
    FormattingTools.prototype.clearStyle = function () {
        this.htmlEditorProvider.getCurrentHtmlEditor().clearStyle();
        this.updateFormattingState();
    };
    FormattingTools.prototype.toggleUnderlined = function () {
        this.htmlEditorProvider.getCurrentHtmlEditor().toggleUnderlined();
        this.updateFormattingState();
    };
    FormattingTools.prototype.toggleUl = function () {
        this.htmlEditorProvider.getCurrentHtmlEditor().toggleUl();
        this.updateFormattingState();
    };
    FormattingTools.prototype.toggleOl = function () {
        this.htmlEditorProvider.getCurrentHtmlEditor().toggleOl();
        this.updateFormattingState();
    };
    FormattingTools.prototype.toggleP = function () {
        this.htmlEditorProvider.getCurrentHtmlEditor().toggleP();
        this.updateFormattingState();
    };
    FormattingTools.prototype.toggleH1 = function () {
        this.htmlEditorProvider.getCurrentHtmlEditor().toggleH1();
        this.updateFormattingState();
    };
    FormattingTools.prototype.toggleH2 = function () {
        this.htmlEditorProvider.getCurrentHtmlEditor().toggleH2();
        this.updateFormattingState();
    };
    FormattingTools.prototype.toggleH3 = function () {
        this.htmlEditorProvider.getCurrentHtmlEditor().toggleH3();
        this.updateFormattingState();
    };
    FormattingTools.prototype.toggleH4 = function () {
        this.htmlEditorProvider.getCurrentHtmlEditor().toggleH4();
        this.updateFormattingState();
    };
    FormattingTools.prototype.toggleH5 = function () {
        this.htmlEditorProvider.getCurrentHtmlEditor().toggleH4();
        this.updateFormattingState();
    };
    FormattingTools.prototype.toggleH6 = function () {
        this.htmlEditorProvider.getCurrentHtmlEditor().toggleH4();
        this.updateFormattingState();
    };
    FormattingTools.prototype.toggleQuote = function () {
        this.htmlEditorProvider.getCurrentHtmlEditor().toggleQuote();
        this.updateFormattingState();
    };
    FormattingTools.prototype.toggleCode = function () {
        this.htmlEditorProvider.getCurrentHtmlEditor().toggleCode();
        this.updateFormattingState();
    };
    FormattingTools.prototype.toggleAlignLeft = function () {
        this.htmlEditorProvider.getCurrentHtmlEditor().toggleAlignLeft();
        this.updateFormattingState();
    };
    FormattingTools.prototype.toggleAlignCenter = function () {
        this.htmlEditorProvider.getCurrentHtmlEditor().toggleAlignCenter();
        this.updateFormattingState();
    };
    FormattingTools.prototype.toggleAlignRight = function () {
        this.htmlEditorProvider.getCurrentHtmlEditor().toggleAlignRight();
        this.updateFormattingState();
    };
    FormattingTools.prototype.toggleJustify = function () {
        this.htmlEditorProvider.getCurrentHtmlEditor().toggleJustify();
        this.updateFormattingState();
    };
    FormattingTools.prototype.resetToNormal = function () {
        this.htmlEditorProvider.getCurrentHtmlEditor().resetToNormal();
        this.updateFormattingState();
    };
    return FormattingTools;
}());
exports.FormattingTools = FormattingTools;
