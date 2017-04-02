"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IViewManager_1 = require("../../app/ui/IViewManager");
var progressIndicator_1 = require("../../app.ko/ui/progressIndicator");
var _ = require("lodash");
require("../../app/core/extensions");
var ViewManager = (function () {
    function ViewManager(eventManager, globalEventHandler) {
        this.contextualEditorsBag = {};
        this.eventManager = eventManager;
        this.globalEventHandler = globalEventHandler;
        this.addProgressIndicator = this.addProgressIndicator.bind(this);
        this.addPromiseProgressIndicator = this.addPromiseProgressIndicator.bind(this);
        this.openWorkshop = this.openWorkshop.bind(this);
        this.scheduleIndicatorRemoval = this.scheduleIndicatorRemoval.bind(this);
        this.updateJourneyComponent = this.updateJourneyComponent.bind(this);
        this.clearJourney = this.clearJourney.bind(this);
        this.setWidgetEditor = this.setWidgetEditor.bind(this);
        this.foldEverything = this.foldEverything.bind(this);
        this.unfoldEverything = this.unfoldEverything.bind(this);
        this.closeWidgetEditor = this.closeWidgetEditor.bind(this);
        this.mode = IViewManager_1.ViewManagerMode.edit;
        this.progressIndicators = ko.observableArray();
        this.journey = ko.observableArray();
        this.journeyName = ko.observable();
        this.itemSelectorName = ko.observable(null);
        this.currentItemSelectorName = "";
        this.widgetEditor = ko.observable();
        this.contextualEditors = ko.observableArray([]);
        this.highlightedElement = ko.observable();
        this.selectedElement = ko.observable();
        this.primaryToolboxVisible = ko.observable(true);
        this.globalEventHandler.addDragEnterListener(this.foldEverything);
        this.globalEventHandler.addDragDropListener(this.unfoldEverything);
        this.globalEventHandler.addDragEndListener(this.unfoldEverything);
        this.globalEventHandler.addDragLeaveScreenListener(this.unfoldEverything);
        document.addEventListener("click", function (event) {
            if ($(event.target).closest("workshops").length === 0 && this.currentItemSelectorName != this.itemSelectorName()) {
                this.clearJourney();
            }
        }.bind(this), true);
        eventManager.addEventListener("onEscape", this.closeWidgetEditor);
    }
    ViewManager.prototype.getCurrentJourney = function () {
        return this.journeyName();
    };
    ViewManager.prototype.addProgressIndicator = function (title, content) {
        var indicator = new progressIndicator_1.ProgressIndicator(title, content);
        this.progressIndicators.push(indicator);
        return indicator;
    };
    ViewManager.prototype.notifySuccess = function (title, content) {
        var indicator = new progressIndicator_1.ProgressIndicator(title, content, 100);
        this.progressIndicators.push(indicator);
        this.scheduleIndicatorRemoval(indicator);
    };
    ViewManager.prototype.addPromiseProgressIndicator = function (promise, title, content) {
        var _this = this;
        var indicator = new progressIndicator_1.ProgressIndicator(title, content);
        this.progressIndicators.push(indicator);
        if (promise["progress"]) {
            promise["progress"](indicator.progress);
        }
        promise.then(function () {
            indicator.complete(true);
        });
        promise.then(function () {
            _this.scheduleIndicatorRemoval(indicator);
        });
    };
    ViewManager.prototype.newJourney = function (journeyName, componentName, parameters) {
        this.clearJourney();
        this.journeyName(journeyName);
        this.openWorkshop(componentName, parameters);
        this.widgetEditor(null);
    };
    ViewManager.prototype.updateJourneyComponent = function (component) {
        var result = this.journey();
        var existingComponent = result.first(function (c) { return c.name === component.name; });
        if (existingComponent) {
            result = result.splice(0, result.indexOf(existingComponent));
        }
        result.push(component);
        this.journey(result);
    };
    ViewManager.prototype.clearJourney = function () {
        this.journey([]);
        this.itemSelectorName(null);
        this.mode = IViewManager_1.ViewManagerMode.edit;
    };
    ViewManager.prototype.foldWorkshops = function () {
        this.journey([]);
        this.primaryToolboxVisible(false);
    };
    ViewManager.prototype.unfoldWorkshop = function () {
        this.primaryToolboxVisible(true);
    };
    ViewManager.prototype.foldEverything = function () {
        this.foldWorkshops();
        this.mode = IViewManager_1.ViewManagerMode.fold;
        this.clearContextualEditors();
    };
    ViewManager.prototype.unfoldEverything = function () {
        this.primaryToolboxVisible(true);
        this.mode = IViewManager_1.ViewManagerMode.edit;
    };
    ViewManager.prototype.openWorkshop = function (componentName, parameters) {
        this.clearContextualEditors();
        var component = {
            name: componentName,
            params: parameters
        };
        this.currentItemSelectorName = component.name;
        this.updateJourneyComponent(component);
        this.mode = IViewManager_1.ViewManagerMode.configure;
    };
    ViewManager.prototype.closeWorkshop = function (componentName) {
        var result = this.journey();
        var existingComponent = result.first(function (c) { return c.name === componentName; });
        if (existingComponent) {
            result = result.splice(0, result.indexOf(existingComponent));
        }
        this.journey(result);
        this.mode = IViewManager_1.ViewManagerMode.edit;
    };
    ViewManager.prototype.scheduleIndicatorRemoval = function (indicator) {
        var _this = this;
        indicator.progress(100);
        setTimeout(function () {
            _this.progressIndicators(_.without(_this.progressIndicators(), indicator));
        }, 4000);
    };
    ViewManager.prototype.openUploadDialog = function () {
        var $genericUploader = $("<input type='file' multiple />");
        var genericUploader = $genericUploader[0];
        $genericUploader.click();
        return new Promise(function (resolve, reject) {
            $genericUploader.change(function () {
                resolve(genericUploader.files);
            });
        });
    };
    ViewManager.prototype.setWidgetEditor = function (editorSession) {
        this.clearContextualEditors();
        this.currentItemSelectorName = editorSession.component.name;
        this.widgetEditor(editorSession);
        this.mode = IViewManager_1.ViewManagerMode.configure;
    };
    ViewManager.prototype.closeWidgetEditor = function () {
        this.currentItemSelectorName = "";
        this.itemSelectorName(null);
        this.widgetEditor(null);
        this.clearContextualEditors();
        this.mode = IViewManager_1.ViewManagerMode.edit;
    };
    ViewManager.prototype.setContextualEditor = function (editorName, contextualEditor) {
        var _this = this;
        this.contextualEditorsBag[editorName] = contextualEditor;
        var editors = Object.keys(this.contextualEditorsBag).map(function (key) { return _this.contextualEditorsBag[key]; });
        this.contextualEditors(editors);
    };
    ViewManager.prototype.removeContextualEditor = function (editorName) {
        var _this = this;
        if (!this.contextualEditorsBag[editorName]) {
            return;
        }
        delete this.contextualEditorsBag[editorName];
        var editors = Object.keys(this.contextualEditorsBag).map(function (key) { return _this.contextualEditorsBag[key]; });
        this.contextualEditors(editors);
    };
    ViewManager.prototype.clearContextualEditors = function () {
        this.contextualEditorsBag = {};
        this.contextualEditors([]);
        this.highlightedElement(null);
        this.selectedElement(null);
    };
    ViewManager.prototype.setHighlight = function (config) {
        this.highlightedElement(null);
        this.highlightedElement(config);
    };
    ViewManager.prototype.setSelectedElement = function (config) {
        this.selectedElement(null);
        this.selectedElement(config);
    };
    return ViewManager;
}());
exports.ViewManager = ViewManager;
