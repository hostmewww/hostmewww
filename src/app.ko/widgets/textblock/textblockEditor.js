"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TextblockEditor = (function () {
    function TextblockEditor(eventManager, viewManager) {
        this.viewManager = viewManager;
        this.eventManager = eventManager;
        this.onSelectionChange = this.onSelectionChange.bind(this);
        this.setWidgetModel = this.setWidgetModel.bind(this);
        this.pluginNames = ko.observableArray();
        this.pluginNames.push("formatting");
        this.pluginNames.push("hyperlink-editor");
    }
    TextblockEditor.prototype.setWidgetModel = function (textblockModel) {
        this.textblockModel = textblockModel;
        textblockModel.htmlEditor.enable();
        this.eventManager.dispatchEvent("htmlEditorChanged", textblockModel.htmlEditor);
        if (this.textblockModel && this.textblockModel.htmlEditor) {
            this.textblockModel.htmlEditor.removeSelectionChangeListener(this.onSelectionChange);
        }
        this.textblockModel.htmlEditor.addSelectionChangeListener(this.onSelectionChange);
    };
    TextblockEditor.prototype.onSelectionChange = function () {
        this.textblockModel.state = this.textblockModel.htmlEditor.getState();
    };
    return TextblockEditor;
}());
exports.TextblockEditor = TextblockEditor;
