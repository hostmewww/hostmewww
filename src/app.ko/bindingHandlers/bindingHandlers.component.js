var componentLoadingOperationUniqueId = 0;
ko.bindingHandlers["component"] = {
    "init": function (element, valueAccessor, ignored1, ignored2, bindingContext) {
        var currentViewModel, currentLoadingOperationId, disposeAssociatedComponentViewModel = function () {
            var currentViewModelDispose = currentViewModel && currentViewModel["dispose"];
            if (typeof currentViewModelDispose === "function") {
                currentViewModelDispose.call(currentViewModel);
            }
            currentViewModel = null;
            currentLoadingOperationId = null;
        }, originalChildNodes = makeArray(ko.virtualElements.childNodes(element));
        ko.utils.domNodeDisposal.addDisposeCallback(element, disposeAssociatedComponentViewModel);
        ko.computed(function () {
            var componentOnCreateHandler;
            var value = ko.utils.unwrapObservable(valueAccessor()), componentName, componentParams;
            if (typeof value === "string") {
                componentName = value;
            }
            else {
                componentName = ko.utils.unwrapObservable(value["name"]);
                componentParams = ko.utils.unwrapObservable(value["params"]);
                componentOnCreateHandler = ko.utils.unwrapObservable(value["oncreate"]);
            }
            if (!componentName) {
                throw new Error("No component name specified");
            }
            var loadingOperationId = currentLoadingOperationId = ++componentLoadingOperationUniqueId;
            ko.components.get(componentName, function (componentDefinition) {
                if (currentLoadingOperationId !== loadingOperationId) {
                    return;
                }
                disposeAssociatedComponentViewModel();
                if (!componentDefinition) {
                    throw new Error('Unknown component \'' + componentName + '\'');
                }
                var root = cloneTemplateIntoElement(componentName, componentDefinition, element, !!componentDefinition.shadow);
                var componentViewModel = createViewModel(componentDefinition, root, originalChildNodes, componentParams), childBindingContext = bindingContext['createChildContext'](componentViewModel, undefined, function (ctx) {
                    ctx["$component"] = componentViewModel;
                    ctx["$componentTemplateNodes"] = originalChildNodes;
                });
                currentViewModel = componentViewModel;
                ko.applyBindingsToDescendants(childBindingContext, root);
                if (componentOnCreateHandler) {
                    componentOnCreateHandler(componentViewModel, element);
                }
            });
        }, null, { disposeWhenNodeIsRemoved: element });
        return { 'controlsDescendantBindings': true };
    }
};
ko.virtualElements.allowedBindings['component'] = true;
var makeArray = function (arrayLikeObject) {
    var result = [];
    for (var i = 0, j = arrayLikeObject.length; i < j; i++) {
        result.push(arrayLikeObject[i]);
    }
    ;
    return result;
};
var cloneNodes = function (nodesArray, shouldCleanNodes) {
    for (var i = 0, j = nodesArray.length, newNodesArray = []; i < j; i++) {
        var clonedNode = nodesArray[i].cloneNode(true);
        newNodesArray.push(shouldCleanNodes ? ko.cleanNode(clonedNode) : clonedNode);
    }
    return newNodesArray;
};
function cloneTemplateIntoElement(componentName, componentDefinition, element, useShadow) {
    var template = componentDefinition['template'];
    if (!template) {
        return element;
    }
    if (useShadow) {
        if (!element.shadowRoot) {
            element.createShadowRoot();
        }
        else {
            while (element.shadowRoot.firstChild) {
                ko.removeNode(element.shadowRoot.firstChild);
            }
        }
        var root = document.createElement("div");
        var clonedNodesArray = cloneNodes(template, false);
        for (var i = 0, j = clonedNodesArray.length; i < j; i++) {
            root.appendChild(clonedNodesArray[i]);
        }
        element.shadowRoot.appendChild(root);
        return root;
    }
    else {
        var clonedNodesArray = cloneNodes(template, false);
        ko.virtualElements.setDomNodeChildren(element, clonedNodesArray);
        return element;
    }
}
function createViewModel(componentDefinition, element, originalChildNodes, componentParams) {
    var componentViewModelFactory = componentDefinition['createViewModel'];
    return componentViewModelFactory
        ? componentViewModelFactory.call(componentDefinition, componentParams, { 'element': element, 'templateNodes': originalChildNodes })
        : componentParams;
}
