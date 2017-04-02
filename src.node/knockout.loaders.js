"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var Paths = require("./paths");
var KnockoutRegistrationLoaders = (function () {
    function KnockoutRegistrationLoaders() {
    }
    KnockoutRegistrationLoaders.prototype.register = function (injector) {
        var injectableComponentLoader = {
            loadViewModel: function (name, config, callback) {
                if (config.injectable) {
                    var viewModelConstructor = function (params) {
                        var resolvedInjectable = injector.resolve(config.injectable);
                        if (resolvedInjectable.factory) {
                            return resolvedInjectable.factory(injector, params);
                        }
                        return resolvedInjectable;
                    };
                    ko.components.defaultLoader.loadViewModel(name, viewModelConstructor, callback);
                }
                else {
                    callback(null);
                }
            },
            loadTemplate: function (name, templateConfig, callback) {
                if (templateConfig.fromUrl) {
                    var filepath = Paths.templatesBasePath + "/" + templateConfig.fromUrl;
                    fs.readFile(filepath, "utf8", function (error, templateHtml) {
                        var temporaryHost = document.createElement("h1");
                        var documentFragment = document.createDocumentFragment();
                        temporaryHost.innerHTML = templateHtml;
                        var nodesArray = temporaryHost.childNodes;
                        for (var i = 0, j = nodesArray.length, newNodesArray = []; i < j; i++) {
                            var clonedNode = nodesArray[i].cloneNode(true);
                            documentFragment.appendChild(clonedNode);
                        }
                        ko.components.defaultLoader.loadTemplate(name, [documentFragment], callback);
                    });
                }
                else {
                    callback(null);
                }
            },
            loadComponent: function (componentName, config, callback) {
                var callbackWrapper = function (resultWrapper) {
                    var createViewModelWrapper = function (params, options) {
                        if (config.preprocess) {
                            config.preprocess(options.element, params);
                        }
                        var viewModel = resultWrapper.createViewModel(params, options);
                        if (config.postprocess) {
                            config.postprocess(options.element, viewModel);
                        }
                        return viewModel;
                    };
                    var definitionWrapper = {
                        template: resultWrapper.template,
                        createViewModel: createViewModelWrapper
                    };
                    definitionWrapper.shadow = config.template && config.template.shadow;
                    callback(definitionWrapper);
                };
                ko.components.defaultLoader.loadComponent(componentName, config, callbackWrapper);
            },
        };
        ko.components.loaders.unshift(injectableComponentLoader);
    };
    return KnockoutRegistrationLoaders;
}());
exports.KnockoutRegistrationLoaders = KnockoutRegistrationLoaders;
