"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../app.ko/bindingHandlers/bindingHandlers.background");
require("../app.ko/bindingHandlers/bindingHandlers.balloon");
require("../app.ko/bindingHandlers/bindingHandlers.codeEditor");
require("../app.ko/bindingHandlers/bindingHandlers.columnSize");
require("../app.ko/bindingHandlers/bindingHandlers.component");
require("../app.ko/bindingHandlers/bindingHandlers.content");
require("../app.ko/bindingHandlers/bindingHandlers.draggables");
require("../app.ko/bindingHandlers/bindingHandlers.googlemap");
require("../app.ko/bindingHandlers/bindingHandlers.grid");
require("../app.ko/bindingHandlers/bindingHandlers.highlight");
require("../app.ko/bindingHandlers/bindingHandlers.lightbox");
require("../app.ko/bindingHandlers/bindingHandlers.hyperlink");
require("../app.ko/bindingHandlers/bindingHandlers.resourcePicker");
require("../app.ko/bindingHandlers/bindingHandlers.scrollable");
require("../app.ko/bindingHandlers/bindingHandlers.slate");
require("../app.ko/bindingHandlers/bindingHandlers.snapTo");
require("../app.ko/bindingHandlers/bindingHandlers.stickTo");
require("../app.ko/bindingHandlers/bindingHandlers.surface");
var bindingHandlers_widget_1 = require("../app.ko/bindingHandlers/bindingHandlers.widget");
var bindingHandlers_content_1 = require("../app.ko/bindingHandlers/bindingHandlers.content");
var bindingHandlers_draggables_1 = require("../app.ko/bindingHandlers/bindingHandlers.draggables");
var bindingHandlers_grid_1 = require("../app.ko/bindingHandlers/bindingHandlers.grid");
var bindingHandlers_lightbox_1 = require("../app.ko/bindingHandlers/bindingHandlers.lightbox");
var KnockoutRegistrationCommon = (function () {
    function KnockoutRegistrationCommon() {
    }
    KnockoutRegistrationCommon.prototype.register = function (injector) {
        ko.virtualElements.allowedBindings["widget"] = true;
        ko.virtualElements.allowedBindings["widgetH"] = true;
        ko.virtualElements.allowedBindings["layoutrow"] = true;
        ko.virtualElements.allowedBindings["component"] = true;
        injector.bindSingleton("contentBindingHandler", bindingHandlers_content_1.ContentBindingHandler);
        injector.bindSingleton("gridBindingHandler", bindingHandlers_grid_1.GridBindingHandler);
        injector.bindSingleton("lighboxBindingHandler", bindingHandlers_lightbox_1.LightboxBindingHandler);
        injector.bindSingleton("draggablesBindingHandler", bindingHandlers_draggables_1.DraggablesBindingHandler);
        injector.bindSingleton("widgetBindingHandler", bindingHandlers_widget_1.WidgetBindingHandler);
    };
    return KnockoutRegistrationCommon;
}());
exports.KnockoutRegistrationCommon = KnockoutRegistrationCommon;
