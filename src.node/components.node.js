"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var path = require("path");
var staticSettingsProvider_1 = require("./staticSettingsProvider");
var filesystemBlobStorage_1 = require("./filesystemBlobStorage");
var assetPublisher_1 = require("./../src/app/publishing/assetPublisher");
var routeHandler_1 = require("./routeHandler");
var permalinkResolver_1 = require("./../src/app/permalinks/permalinkResolver");
var Constants = require("./paths");
var ComponentRegistrationNode = (function () {
    function ComponentRegistrationNode() {
    }
    ComponentRegistrationNode.prototype.register = function (injector) {
        injector.bindSingleton("settingsProvider", staticSettingsProvider_1.StaticSettingsProvider);
        injector.bindSingleton("routeHandler", routeHandler_1.SaticRouteHandler);
        injector.bindFactory("permalinkResolver", function (ctx) {
            var permalinkService = ctx.resolve("permalinkService");
            return new permalinkResolver_1.PermalinkResolver(permalinkService, []);
        });
        injector.bindInstance("inputBlobStorage", new filesystemBlobStorage_1.FileSystemBlobStorage(path.resolve(Constants.inputBasePath)));
        injector.bindInstance("outputBlobStorage", new filesystemBlobStorage_1.FileSystemBlobStorage(path.resolve(Constants.outputBasePath)));
        var inputBlobStorage = injector.resolve("inputBlobStorage");
        var outputBlobStorage = injector.resolve("outputBlobStorage");
        injector.bindInstance("assetPublisher", new assetPublisher_1.AssetPublisher(inputBlobStorage, outputBlobStorage, "assets"));
    };
    return ComponentRegistrationNode;
}());
exports.ComponentRegistrationNode = ComponentRegistrationNode;
