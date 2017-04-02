"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
ko.bindingHandlers["hyperlink"] = {
    init: function (element, valueAccessor) {
        var hyperlink = valueAccessor();
        var attr = ko.observable();
        if (ko.isObservable(hyperlink)) {
            hyperlink.subscribe(function (newHyperlink) {
                if (newHyperlink) {
                    attr(newHyperlink);
                }
                else {
                    attr({ href: "#", target: "_blank" });
                }
            });
        }
        var initial = ko.unwrap(hyperlink);
        if (initial) {
            attr({ href: initial.href, target: initial.target });
        }
        else {
            attr({ href: "#", target: "_blank" });
        }
        ko.applyBindingsToNode(element, { attr: attr });
    }
};
