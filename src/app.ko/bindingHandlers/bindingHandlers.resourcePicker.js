"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
ko.bindingHandlers["resourcePicker"] = {
    init: function (element, valueAccessor) {
        var config = valueAccessor();
        var resourcePicker = ko.unwrap(config["resourcePicker"]);
        var onSelect = ko.unwrap(config["onSelect"]);
        var hyperlink = ko.unwrap(config["hyperlink"]);
        var onSelectCallback;
        var onSelectCallbackProxy = function (newResource) {
            if (onSelectCallback) {
                onSelectCallback(newResource);
            }
        };
        ko.applyBindingsToNode(element, {
            component: {
                name: resourcePicker.componentName,
                params: { onSelect: onSelectCallbackProxy },
                oncreate: function (resourceSelector) {
                    if (hyperlink && resourceSelector.selectResource) {
                        resourceSelector.selectResource(hyperlink.href);
                    }
                    onSelectCallback = function (newResource) {
                        var hyperlink = resourcePicker.getHyperlinkFromResource(newResource);
                        onSelect(hyperlink);
                    };
                }
            }
        });
    }
};
