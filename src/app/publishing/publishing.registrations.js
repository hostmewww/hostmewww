"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var githubPublisher_1 = require("./../github/githubPublisher");
var mediaPublisher_1 = require("./mediaPublisher");
var pagePublisher_1 = require("./pagePublisher");
var blogPublisher_1 = require("./blogPublisher");
var newsPublisher_1 = require("./newsPublisher");
var publisher_1 = require("./publisher");
var githubBlobStorage_1 = require("./../github/githubBlobStorage");
var githubClient_1 = require("./../github/githubClient");
var PublishingRegistration = (function () {
    function PublishingRegistration() {
    }
    PublishingRegistration.prototype.register = function (injector) {
        injector.bindSingleton("sitePublisher", publisher_1.SitePublisher);
        injector.bindSingleton("pagePublisher", pagePublisher_1.PagePublisher);
        injector.bindSingleton("blogPublisher", blogPublisher_1.BlogPublisher);
        injector.bindSingleton("newsPublisher", newsPublisher_1.NewsPublisher);
        injector.bindSingleton("mediaPublisher", mediaPublisher_1.MediaPublisher);
        var httpClient = injector.resolve("httpClient");
        var settingsProvider = injector.resolve("settingsProvider");
        var githubClient = new githubClient_1.GithubClient(settingsProvider, httpClient);
        var eventManager = injector.resolve("eventManager");
        var githubBlobStorage = new githubBlobStorage_1.GithubBlobStorage(githubClient);
        injector.bindInstance("githubClient", githubClient);
        injector.bindSingleton("githubPublisher", githubPublisher_1.GithubPublisher);
        var pagePublisher = injector.resolve("pagePublisher");
        var mediaPublisher = injector.resolve("mediaPublisher");
        var assetPublisher = injector.resolve("assetPublisher");
        var blogPublisher = injector.resolve("blogPublisher");
        var newsPublisher = injector.resolve("newsPublisher");
        injector.bindInstance("publishers", [
            assetPublisher,
            mediaPublisher
        ]);
        injector.bindInstance("publishersInSequence", [
            pagePublisher,
            blogPublisher,
            newsPublisher
        ]);
    };
    return PublishingRegistration;
}());
exports.PublishingRegistration = PublishingRegistration;
