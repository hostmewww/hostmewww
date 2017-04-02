"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Code = (function () {
    function Code() {
        this.code = ko.observable("var i = 0;");
        this.lang = ko.observable("csharp");
        this.theme = ko.observable("ambient");
        this.isEditable = ko.observable(false);
    }
    return Code;
}());
exports.Code = Code;
