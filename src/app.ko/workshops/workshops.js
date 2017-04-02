"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Workshops = (function () {
    function Workshops(viewManager) {
        this.viewManager = viewManager;
        this.closeJourney = this.closeJourney.bind(this);
        this.journey = ko.observable();
        this.dragging = ko.observable(false);
    }
    Workshops.prototype.openLayouts = function () {
        this.viewManager.newJourney("Layouts", "layouts");
        this.journey("layouts");
    };
    Workshops.prototype.openPages = function () {
        this.viewManager.newJourney("Pages", "pages");
        this.journey("pages");
    };
    Workshops.prototype.openBlogs = function () {
        this.viewManager.newJourney("Blog", "blogs");
        this.journey("blogs");
    };
    Workshops.prototype.openNews = function () {
        this.viewManager.newJourney("News", "news");
        this.journey("news");
    };
    Workshops.prototype.openMedia = function () {
        this.viewManager.newJourney("Media", "media");
        this.journey("media");
    };
    Workshops.prototype.openNavigation = function () {
        this.viewManager.newJourney("Navigation", "navigation");
        this.journey("navigation");
    };
    Workshops.prototype.openSettings = function () {
        this.viewManager.newJourney("Settings", "settings");
        this.journey("settings");
    };
    Workshops.prototype.openWidgets = function () {
        this.viewManager.newJourney("Widgets", "widgets");
        this.journey("widgets");
    };
    Workshops.prototype.closeJourney = function () {
        this.journey();
        this.viewManager.clearJourney();
    };
    return Workshops;
}());
exports.Workshops = Workshops;
