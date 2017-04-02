"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formattableStates = ["bold", "italic", "underlined", "hyperlink", "h1", "h2", "h3", "h4", "h5", "h6",
    "quote", "code", "ol", "ul", "alignedLeft", "alignedRight", "alignedCenter", "justified"];
var ParagraphAlignmentClassNames = (function () {
    function ParagraphAlignmentClassNames() {
    }
    return ParagraphAlignmentClassNames;
}());
ParagraphAlignmentClassNames.alignLeft = "text-left";
ParagraphAlignmentClassNames.alignCenter = "text-center";
ParagraphAlignmentClassNames.alignRight = "text-right";
ParagraphAlignmentClassNames.justify = "text-justify";
exports.ParagraphAlignmentClassNames = ParagraphAlignmentClassNames;
var SelectionState = (function () {
    function SelectionState() {
    }
    return SelectionState;
}());
exports.SelectionState = SelectionState;
var HtmlEditorEvents = (function () {
    function HtmlEditorEvents() {
    }
    return HtmlEditorEvents;
}());
HtmlEditorEvents.onSelectionChange = "onSelectionChange";
HtmlEditorEvents.onEditorDisabled = "onEditorDisabled";
exports.HtmlEditorEvents = HtmlEditorEvents;
