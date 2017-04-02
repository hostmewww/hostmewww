"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ContentBindingHandler = (function () {
    function ContentBindingHandler() {
        ko.bindingHandlers["content"] = {
            update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                var observable = valueAccessor();
                if (observable() === element.innerHTML)
                    return;
                ko.utils.setHtml(element, observable);
                ko.applyBindingsToDescendants(bindingContext, element);
            }
        };
    }
    return ContentBindingHandler;
}());
exports.ContentBindingHandler = ContentBindingHandler;
