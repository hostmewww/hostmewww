"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ButtonViewModel = (function () {
    function ButtonViewModel() {
        this.label = ko.observable("Button");
        this.css = ko.observable();
        this.hyperlink = ko.observable();
    }
    ButtonViewModel.prototype.attachToModel = function (model) {
        this.label(model.label);
        this.hyperlink(model.hyperlink);
        var classes = [];
        switch (model.style) {
            case "default":
                classes.push("btn-default");
                break;
            case "primary":
                classes.push("btn-primary");
                break;
            case "inverted":
                classes.push("btn-inverted");
                break;
        }
        switch (model.size) {
            case "default":
                break;
            case "medium":
                classes.push("btn-medium");
                break;
            case "large":
                classes.push("btn-large");
                break;
        }
        this.css(classes.join(" "));
    };
    return ButtonViewModel;
}());
exports.ButtonViewModel = ButtonViewModel;
