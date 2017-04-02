"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var documentViewModel_1 = require("../app.ko/widgets/layout/documentViewModel");
var layoutViewModel_1 = require("../app.ko/widgets/layout/layoutViewModel");
var pageViewModel_1 = require("../app.ko/widgets/page/pageViewModel");
var mapViewModel_1 = require("../app.ko/widgets/map/mapViewModel");
var textblockViewModel_1 = require("../app.ko/widgets/textblock/textblockViewModel");
var audioViewModel_1 = require("../app.ko/widgets/audio-player/audioViewModel");
var buttonViewModel_1 = require("../app.ko/widgets/button/buttonViewModel");
var pictureViewModel_1 = require("../app.ko/widgets/picture/pictureViewModel");
var sectionViewModel_1 = require("../app.ko/widgets/section/sectionViewModel");
var rowViewModel_1 = require("../app.ko/widgets/row/rowViewModel");
var columnViewModel_1 = require("../app.ko/widgets/column/columnViewModel");
var navbarViewModel_1 = require("../app.ko/widgets/navbar/navbarViewModel");
var youtubePlayerViewModel_1 = require("../app.ko/widgets/youtube-player/youtubePlayerViewModel");
var videoPlayerViewModel_1 = require("../app.ko/widgets/video-player/videoPlayerViewModel");
var followUs_1 = require("../app.ko/widgets/intercom/followUs");
var gtm_1 = require("../app.ko/widgets/gtm/gtm");
var intercom_1 = require("../app.ko/widgets/intercom/intercom");
var ComponentRegistrationWidgets = (function () {
    function ComponentRegistrationWidgets() {
    }
    ComponentRegistrationWidgets.prototype.register = function (injector) {
        injector.bind("docWidget", documentViewModel_1.DocumentViewModel);
        injector.bind("layoutWidget", layoutViewModel_1.LayoutViewModel);
        injector.bind("pageWidget", pageViewModel_1.PageViewModel);
        injector.bind("map", mapViewModel_1.MapViewModel);
        injector.bind("textblock", textblockViewModel_1.TextblockViewModel);
        injector.bind("audioPlayer", audioViewModel_1.AudioPlayerViewModel);
        injector.bind("button", buttonViewModel_1.ButtonViewModel);
        injector.bind("picture", pictureViewModel_1.PictureViewModel);
        injector.bind("section", sectionViewModel_1.SectionViewModel);
        injector.bind("row", rowViewModel_1.RowViewModel);
        injector.bind("column", columnViewModel_1.ColumnViewModel);
        injector.bind("navbar", navbarViewModel_1.NavbarViewModel);
        injector.bind("youtubePlayer", youtubePlayerViewModel_1.YoutubePlayerViewModel);
        injector.bind("videoPlayer", videoPlayerViewModel_1.VideoPlayerViewModel);
        injector.bind("followusBlock", followUs_1.FollowUs);
        injector.bind("gtm", gtm_1.GoogleTagManager);
        injector.bind("intercom", intercom_1.IntercomViewModel);
    };
    return ComponentRegistrationWidgets;
}());
exports.ComponentRegistrationWidgets = ComponentRegistrationWidgets;
