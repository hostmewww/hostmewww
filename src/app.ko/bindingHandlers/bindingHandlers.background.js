"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
ko.bindingHandlers["style"] = {
    update: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor() || {});
        ko.utils.objectForEach(value, function (styleName, styleValue) {
            styleValue = ko.utils.unwrapObservable(styleValue);
            if (styleValue === null || styleValue === undefined || styleValue === false) {
                styleValue = "";
            }
            element.style.setProperty(styleName, styleValue);
        });
    }
};
ko.bindingHandlers["background"] = {
    init: function (element, valueAccessor) {
        var configuration = valueAccessor();
        var styleObservable = ko.observable();
        var setBackground = function (config) {
            var style = {};
            if (config.color) {
                Object.assign(style, { "background-color": config.color });
            }
            if (config.imageUrl) {
                Object.assign(style, { "background-image": "url(\"" + ko.unwrap(config.imageUrl) + "\")" });
            }
            if (config.position) {
                Object.assign(style, { "background-position": config.position });
            }
            if (config.size) {
                Object.assign(style, { "background-size": config.size });
            }
            if (config.repeat) {
                Object.assign(style, { "background-repeat": config.repeat });
            }
            styleObservable(style);
        };
        ko.applyBindingsToNode(element, { style: styleObservable });
        if (ko.isObservable(configuration)) {
            configuration.subscribe(function (newConfiguration) {
                if (!newConfiguration) {
                    newConfiguration = {};
                }
                else {
                    setBackground(ko.unwrap(newConfiguration));
                }
            });
        }
        var initialConfiguration = ko.unwrap(configuration);
        if (!initialConfiguration) {
            initialConfiguration = {};
        }
        setBackground(initialConfiguration);
    }
};
