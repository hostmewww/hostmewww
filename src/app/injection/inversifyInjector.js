"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
require("reflect-metadata");
var InversifyInjector = (function () {
    function InversifyInjector() {
        this.kernel = new inversify_1.Container();
        this.bindSingleton = this.bindSingleton.bind(this);
        this.bind = this.bind.bind(this);
        this.bindComponent = this.bindComponent.bind(this);
    }
    InversifyInjector.prototype.getFunctionArguments = function (func) {
        var args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1];
        return args.split(',')
            .map(function (arg) {
            return arg.replace(/\/\*.*\*\//, '').trim();
        })
            .filter(function (arg) {
            return arg;
        });
    };
    InversifyInjector.prototype.bindInternal = function (name, component) {
        if (this.kernel.isBound(name)) {
            this.kernel.unbind(name);
        }
        try {
            inversify_1.decorate(inversify_1.injectable(), component);
        }
        catch (error) {
            console.warn("Unable to decorate component \"" + name + "\". " + error);
        }
        var constructorArguments = this.getFunctionArguments(component);
        for (var i = 0; i < constructorArguments.length; i++) {
            try {
                inversify_1.decorate(inversify_1.inject(constructorArguments[i]), component, i);
            }
            catch (error) {
                console.warn("Unable to decorate constructor argument \"" + constructorArguments[i] + "\" for component \"" + name + "\". " + error);
            }
        }
        return this.kernel.bind(name).to(component);
    };
    InversifyInjector.prototype.bind = function (name, transient) {
        this.bindInternal(name, transient);
    };
    InversifyInjector.prototype.bindSingleton = function (name, singletone) {
        this.bindInternal(name, singletone).inSingletonScope();
    };
    InversifyInjector.prototype.bindComponent = function (name, factory) {
        var construct = function () {
            this.factory = factory;
        };
        this.bindInternal(name, construct).inSingletonScope();
    };
    InversifyInjector.prototype.bindFactory = function (name, factory) {
        var injector = this;
        var construct = function () {
            return factory(injector);
        };
        this.bindInternal(name, construct).inSingletonScope();
    };
    InversifyInjector.prototype.bindInstance = function (name, instance) {
        this.kernel.bind(name).toConstantValue(instance);
    };
    InversifyInjector.prototype.resolve = function (runtimeIdentifier) {
        var component = this.kernel.get(runtimeIdentifier);
        if (!component) {
            throw "Component " + runtimeIdentifier + " not found.";
        }
        return component;
    };
    return InversifyInjector;
}());
exports.InversifyInjector = InversifyInjector;
