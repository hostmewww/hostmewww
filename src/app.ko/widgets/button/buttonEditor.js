"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ButtonEditor = (function () {
    function ButtonEditor() {
        this.onChange = this.onChange.bind(this);
        this.onHyperlinkChange = this.onHyperlinkChange.bind(this);
        this.label = ko.observable();
        this.label.subscribe(this.onChange);
        this.style = ko.observable();
        this.style.subscribe(this.onChange);
        this.size = ko.observable();
        this.size.subscribe(this.onChange);
        this.hyperlink = ko.observable();
        this.hyperlink.subscribe(this.onChange);
        this.hyperlink.subscribe(this.onHyperlinkChange);
        this.hyperlinkTitle = ko.observable();
    }
    ButtonEditor.prototype.onHyperlinkChange = function (hyperlink) {
        if (hyperlink) {
            this.hyperlinkTitle(hyperlink.title);
        }
        else {
            this.hyperlinkTitle("Add a link...");
        }
    };
    ButtonEditor.prototype.onChange = function () {
        if (!this.applyChangesCallback) {
            return;
        }
        this.buttonModel.label = this.label();
        this.buttonModel.style = this.style();
        this.buttonModel.size = this.size();
        this.buttonModel.hyperlink = this.hyperlink();
        this.applyChangesCallback();
    };
    ButtonEditor.prototype.setWidgetModel = function (buttonModel, applyChangesCallback) {
        this.buttonModel = buttonModel;
        this.label(buttonModel.label);
        this.style(buttonModel.style);
        this.size(buttonModel.size);
        this.hyperlink(buttonModel.hyperlink);
        this.applyChangesCallback = applyChangesCallback;
    };
    return ButtonEditor;
}());
exports.ButtonEditor = ButtonEditor;
