"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var subscribedKey = "subscribedTime";
var FollowUs = (function () {
    function FollowUs(intercomService, viewManager) {
        this.intercomService = intercomService;
        this.viewManager = viewManager;
        this.name = ko.observable();
        this.email = ko.observable();
        var subscribedTime = this.getCookieValue(subscribedKey);
        this.isNotSubscribed = ko.observable(!subscribedTime);
    }
    FollowUs.prototype.follow = function () {
        var lead = {
            name: this.email(),
            email: this.email(),
            user_id: this.email(),
            created_at: (new Date).getTime()
        };
        this.intercomService.update(lead);
        dataLayer.push({
            'event': 'Convertion.Newsletter'
        });
        this.setCookie(subscribedKey, lead.created_at.toString());
        this.isNotSubscribed(false);
        this.viewManager.addProgressIndicator("Newsletter", "Thank you! We'll be in touch.", 100);
    };
    FollowUs.prototype.getCookieValue = function (cookieName) {
        var ca = document.cookie.split('; ');
        return _.find(ca, function (cookie) {
            return cookie.indexOf(cookieName) === 0;
        });
    };
    FollowUs.prototype.setCookie = function (variable, value) {
        var date = new Date();
        date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
        document.cookie = variable + '=' + value + '; expires=' + date.toUTCString() + ';';
    };
    return FollowUs;
}());
exports.FollowUs = FollowUs;
