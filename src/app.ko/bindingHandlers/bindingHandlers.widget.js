"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WidgetBindingHandler = (function () {
    function WidgetBindingHandler(viewManager) {
        ko.bindingHandlers["widgetH"] = {
            init: function (widgetElement, valueAccessor) {
                var widgetModel = valueAccessor();
                var oncreate = function (viewModel, element) {
                    widgetModel.applyChanges = function () {
                        widgetModel.setupViewModel(viewModel);
                    };
                    widgetModel.setupViewModel(viewModel);
                    if (element.nodeName == "#comment") {
                        element = element.nextElementSibling;
                    }
                    if (!element) {
                        console.log("Problem");
                        return;
                    }
                    element["attachedModel"] = widgetModel.model;
                    element["attachedWidgetModel"] = widgetModel;
                    if (widgetModel.editor && !widgetModel.readonly) {
                        element.addEventListener("dblclick", function (event) {
                            event.preventDefault();
                            event.stopImmediatePropagation();
                            var editorSession = {
                                component: {
                                    name: widgetModel.editor,
                                    params: {},
                                    oncreate: function (editorViewModel) {
                                        editorViewModel.setWidgetModel(widgetModel.model, widgetModel.applyChanges);
                                    }
                                },
                                hideCloseButton: widgetModel.hideCloseButton
                            };
                            viewManager.setWidgetEditor(editorSession);
                        });
                    }
                };
                ko.applyBindingsToNode(widgetElement, {
                    component: {
                        name: widgetModel.name,
                        params: widgetModel.params,
                        oncreate: oncreate
                    }
                });
            }
        };
    }
    return WidgetBindingHandler;
}());
exports.WidgetBindingHandler = WidgetBindingHandler;
