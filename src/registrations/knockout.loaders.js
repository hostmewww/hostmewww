"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
                var templatesBasePath = "/scripts/templates";
                if (templateConfig.fromUrl) {
                    var fullUrl = templatesBasePath + "/" + templateConfig.fromUrl;
                    $.get(fullUrl, function (markupString) {
                        ko.components.defaultLoader.loadTemplate(name, markupString, callback);
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
