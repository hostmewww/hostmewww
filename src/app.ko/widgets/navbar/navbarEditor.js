"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NavbarEditor = (function () {
    function NavbarEditor() {
        this.align = ko.observable();
        this.align.subscribe(this.onChange.bind(this));
    }
    NavbarEditor.prototype.setWidgetModel = function (navbarModel, applyChangesCallback) {
        this.navbarModel = navbarModel;
        if (navbarModel.align) {
            this.align(navbarModel.align);
        }
        else {
            this.align("left");
        }
        this.applyChangesCallback = applyChangesCallback;
    };
    NavbarEditor.prototype.onChange = function () {
        if (!this.applyChangesCallback) {
            return;
        }
        this.navbarModel.align = this.align();
        this.applyChangesCallback();
    };
    return NavbarEditor;
}());
exports.NavbarEditor = NavbarEditor;
