"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NavbarItemViewModel = (function () {
    function NavbarItemViewModel(routeHandler, label, url) {
        this.routeHandler = routeHandler;
        this.label = ko.observable(label);
        this.url = ko.observable(url);
        this.isActive = ko.observable();
        this.nodes = ko.observableArray();
    }
    NavbarItemViewModel.prototype.setActive = function (selectedItem) {
        if (selectedItem.url()) {
            this.routeHandler.navigateTo(selectedItem.url());
        }
    };
    return NavbarItemViewModel;
}());
exports.NavbarItemViewModel = NavbarItemViewModel;
