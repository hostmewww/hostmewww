"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ColumnEditor = (function () {
    function ColumnEditor() {
        this.setWidgetModel = this.setWidgetModel.bind(this);
        this.alignment = ko.observable();
        this.alignment.subscribe(this.onChange.bind(this));
        this.align = ko.observable();
        this.align.subscribe(this.onChange.bind(this));
    }
    ColumnEditor.prototype.onChange = function () {
        if (!this.applyChangesCallback) {
            return;
        }
        this.column.alignmentSm = this.alignment();
        this.column.alignmentMd = this.alignment();
        this.column.alignmentLg = this.alignment();
        this.applyChangesCallback();
    };
    ColumnEditor.prototype.alignContent = function (alignment) {
        this.alignment(alignment);
    };
    ColumnEditor.prototype.setWidgetModel = function (column, applyChangesCallback) {
        this.column = column;
        this.alignment(this.column.alignmentMd);
        this.applyChangesCallback = applyChangesCallback;
    };
    return ColumnEditor;
}());
exports.ColumnEditor = ColumnEditor;
