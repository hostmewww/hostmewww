"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var audioEditor_1 = require("../app.ko/editors/audio-player/audioEditor");
var audioHandlers_1 = require("../app.ko/editors/audio-player/audioHandlers");
var blogPostDetails_1 = require("../app.ko/workshops/blogs/blogPostDetails");
var blogs_1 = require("../app.ko/workshops/blogs/blogs");
var buttonEditor_1 = require("../app.ko/editors/button/buttonEditor");
var buttonHandlers_1 = require("../app.ko/editors/button/buttonHandlers");
var codeEditor_1 = require("../app.ko/editors/codeblock/codeEditor");
var colorSelector_1 = require("../app.ko/workshops/colors/colorSelector");
var columnEditor_1 = require("../app.ko/editors/column/columnEditor");
var dragManager_1 = require("../app/ui/draggables/dragManager");
var dropbucket_1 = require("../app.ko/workshops/dropbucket/dropbucket");
var formattingTools_1 = require("../app.ko/editors/textblock/formatting/formattingTools");
var hyperlinkTools_1 = require("../app.ko/editors/textblock/hyperlink/hyperlinkTools");
var layoutDetailsWorkshop_1 = require("../app.ko/workshops/layouts/layoutDetailsWorkshop");
var layoutEditor_1 = require("../app/layouts/layoutEditor");
var layoutSelector_1 = require("../app.ko/workshops/layouts/layoutSelector");
var layoutsWorkshop_1 = require("../app.ko/workshops/layouts/layoutsWorkshop");
var lityLightbox_1 = require("../app/ui/lityLightbox");
var mapEditor_1 = require("../app.ko/editors/map/mapEditor");
var mapHandlers_1 = require("../app.ko/editors/map/mapHandlers");
var mediaHandlers_1 = require("../app.ko/editors/mediaHandlers");
var mediaResourcePicker_1 = require("../app.ko/workshops/media/mediaResourcePicker");
var mediaSelector_1 = require("../app.ko/workshops/media/mediaSelector");
var media_1 = require("../app.ko/workshops/media/media");
var navbarEditor_1 = require("../app.ko/editors/navbar/navbarEditor");
var navbarHandlers_1 = require("../app.ko/editors/navbar/navbarHandlers");
var navigationDetails_1 = require("../app.ko/workshops/navigation/navigationDetails");
var navigation_1 = require("../app.ko/workshops/navigation/navigation");
var newsEditor_1 = require("../app.ko/workshops/news/newsEditor");
var newsElementDetailsEditor_1 = require("../app.ko/workshops/news/newsElementDetailsEditor");
var pageDetails_1 = require("../app.ko/workshops/pages/pageDetails");
var pagePlaceholderViewModel_1 = require("../app.ko/widgets/page-placeholder/pagePlaceholderViewModel");
var pageResourcePicker_1 = require("../app.ko/workshops/pages/pageResourcePicker");
var pageSelector_1 = require("../app.ko/workshops/pages/pageSelector");
var pages_1 = require("../app.ko/workshops/pages/pages");
var hyperlinkSelector_1 = require("../app.ko/workshops/hyperlinks/hyperlinkSelector");
var pictureEditor_1 = require("../app.ko/editors/picture/pictureEditor");
var pictureHandlers_1 = require("../app.ko/editors/picture/pictureHandlers");
var rowLayoutSelector_1 = require("../app.ko/workshops/rows/rowLayoutSelector");
var sectionEditor_1 = require("../app.ko/editors/section/sectionEditor");
var sectionLayoutSelector_1 = require("../app.ko/workshops/sections/sectionLayoutSelector");
var settings_1 = require("../app.ko/workshops/settings/settings");
var textblockEditor_1 = require("../app.ko/editors/textblock/textblockEditor");
var textblockHandlers_1 = require("../app.ko/editors/textblock/textblockHandlers");
var urlResourcePicker_1 = require("../app.ko/workshops/hyperlinks/urlResourcePicker");
var urlSelector_1 = require("../app.ko/workshops/hyperlinks/urlSelector");
var videoEditor_1 = require("../app.ko/editors/video-player/videoEditor");
var videoHandlers_1 = require("../app.ko/editors/video-player/videoHandlers");
var widgetSelector_1 = require("../app.ko/workshops/widgets/widgetSelector");
var widgets_1 = require("../app.ko/workshops/widgets/widgets");
var workshops_1 = require("../app.ko/workshops/workshops");
var youtubeHandlers_1 = require("../app.ko/editors/youtube-player/youtubeHandlers");
var permalinkResolver_1 = require("../app/permalinks/permalinkResolver");
var mediaPermalinkResolver_1 = require("../app/media/mediaPermalinkResolver");
var pagePermalinkResolver_1 = require("../app/pages/pagePermalinkResolver");
var newsPermalinkResolver_1 = require("../app/news/newsPermalinkResolver");
var blogPermalinkResolver_1 = require("../app/blogs/blogPermalinkResolver");
var htmlEditorProvider_1 = require("../app/editing/htmlEditorProvider");
var ComponentRegistrationEditors = (function () {
    function ComponentRegistrationEditors() {
    }
    ComponentRegistrationEditors.prototype.register = function (injector) {
        injector.bind("workshops", workshops_1.Workshops);
        injector.bind("settingsWorkshop", settings_1.SettingsWorkshop);
        injector.bind("widgetsWorkshop", widgets_1.WidgetsWorkshop);
        injector.bind("mediaWorkshop", media_1.MediaWorkshop);
        injector.bind("layoutsWorkshop", layoutsWorkshop_1.LayoutsWorkshop);
        injector.bind("pagesWorkshop", pages_1.PagesWorkshop);
        injector.bind("blogWorkshop", blogs_1.BlogWorkshop);
        injector.bind("newsEditor", newsEditor_1.NewsEditor);
        injector.bind("navigationWorkshop", navigation_1.NavigationWorkshop);
        injector.bind("mediaPermalinkResolver", mediaPermalinkResolver_1.MediaPermalinkResolver);
        injector.bind("pagePermalinkResolver", pagePermalinkResolver_1.PagePermalinkResolver);
        injector.bind("newsPermalinkResolver", newsPermalinkResolver_1.NewsLinkResolver);
        injector.bind("blogPermalinkResolver", blogPermalinkResolver_1.BlogPermalinkResolver);
        injector.bindFactory("permalinkResolver", function (ctx) {
            var permalinkService = ctx.resolve("permalinkService");
            var mediaPermalinkResolver = ctx.resolve("mediaPermalinkResolver");
            var pagePermalinkResolver = ctx.resolve("pagePermalinkResolver");
            var newsPermalinkResolver = ctx.resolve("newsPermalinkResolver");
            var blogPermalinkResolver = ctx.resolve("blogPermalinkResolver");
            return new permalinkResolver_1.PermalinkResolver(permalinkService, [
                mediaPermalinkResolver,
                pagePermalinkResolver,
                newsPermalinkResolver,
                blogPermalinkResolver
            ]);
        });
        injector.bindComponent("navigationDetailsWorkshop", function (ctx, node) {
            var navigationService = ctx.resolve("navigationService");
            var viewManager = ctx.resolve("viewManager");
            return new navigationDetails_1.NavigationDetailsWorkshop(node, navigationService, viewManager);
        });
        injector.bindComponent("layoutDetailsWorkshop", function (ctx, layoutReference) {
            var layoutService = ctx.resolve("layoutService");
            var routeHandler = ctx.resolve("routeHandler");
            var viewManager = ctx.resolve("viewManager");
            return new layoutDetailsWorkshop_1.LayoutDetailsWorkshop(layoutService, routeHandler, layoutReference, viewManager);
        });
        injector.bindComponent("pageDetailsWorkshop", function (ctx, pageReference) {
            var pageService = ctx.resolve("pageService");
            var permalinkService = ctx.resolve("permalinkService");
            var routeHandler = ctx.resolve("routeHandler");
            var viewManager = ctx.resolve("viewManager");
            return new pageDetails_1.PageDetailsWorkshop(pageService, permalinkService, routeHandler, pageReference, viewManager);
        });
        injector.bindComponent("blogPostDetailsWorkshop", function (ctx, blogPostReference) {
            var blogService = ctx.resolve("blogService");
            var permalinkService = ctx.resolve("permalinkService");
            var routeHandler = ctx.resolve("routeHandler");
            var viewManager = ctx.resolve("viewManager");
            return new blogPostDetails_1.BlogPostDetailsWorkshop(blogService, permalinkService, routeHandler, blogPostReference, viewManager);
        });
        injector.bindComponent("newsElementDetailsEditor", function (ctx, newsElementReference) {
            var newsService = ctx.resolve("newsService");
            var permalinkService = ctx.resolve("permalinkService");
            var routeHandler = ctx.resolve("routeHandler");
            var viewManager = ctx.resolve("viewManager");
            return new newsElementDetailsEditor_1.NewsElementDetailsEditor(newsService, permalinkService, routeHandler, newsElementReference, viewManager);
        });
        injector.bind("dropbucket", dropbucket_1.DropBucket);
        injector.bindSingleton("textblockHandler", textblockHandlers_1.TextblockHandlers);
        injector.bindSingleton("mediaHandler", mediaHandlers_1.MediaHandlers);
        injector.bindSingleton("pictureDropHandler", pictureHandlers_1.PictureHandlers);
        injector.bindSingleton("mapDropHandler", mapHandlers_1.MapHandlers);
        injector.bindSingleton("videoDropHandler", videoHandlers_1.VideoHandlers);
        injector.bindSingleton("youtubeDropHandler", youtubeHandlers_1.YoutubeHandlers);
        injector.bindSingleton("audioDropHandler", audioHandlers_1.AudioHandlers);
        injector.bindSingleton("navbarHandler", navbarHandlers_1.NavbarHandlers);
        injector.bindSingleton("buttonHandler", buttonHandlers_1.ButtonHandlers);
        injector.bindFactory("dropHandlers", function (ctx) {
            var dropHandlers = new Array();
            dropHandlers.push(ctx.resolve("pictureDropHandler"));
            dropHandlers.push(ctx.resolve("mapDropHandler"));
            dropHandlers.push(ctx.resolve("videoDropHandler"));
            dropHandlers.push(ctx.resolve("youtubeDropHandler"));
            return dropHandlers;
        });
        injector.bindFactory("widgetHandlers", function (ctx) {
            var widgetHandlers = new Array();
            widgetHandlers.push(ctx.resolve("textblockHandler"));
            widgetHandlers.push(ctx.resolve("pictureDropHandler"));
            widgetHandlers.push(ctx.resolve("mapDropHandler"));
            widgetHandlers.push(ctx.resolve("youtubeDropHandler"));
            widgetHandlers.push(ctx.resolve("videoDropHandler"));
            widgetHandlers.push(ctx.resolve("navbarHandler"));
            widgetHandlers.push(ctx.resolve("buttonHandler"));
            return widgetHandlers;
        });
        injector.bindComponent("layoutSelector", function (ctx, params) {
            var layoutService = ctx.resolve("layoutService");
            var permalinkService = ctx.resolve("permalinkService");
            return new layoutSelector_1.LayoutSelector(layoutService, permalinkService, params["onSelect"]);
        });
        injector.bindComponent("pageSelector", function (ctx, params) {
            var pageService = ctx.resolve("pageService");
            var permalinkService = ctx.resolve("permalinkService");
            return new pageSelector_1.PageSelector(pageService, permalinkService, params["onSelect"]);
        });
        injector.bindComponent("mediaSelector", function (ctx, params) {
            var mediaService = ctx.resolve("mediaService");
            var permalinkService = ctx.resolve("permalinkService");
            return new mediaSelector_1.MediaSelector(mediaService, permalinkService, params["onSelect"]);
        });
        injector.bindComponent("colorSelector", function (ctx, params) {
            return new colorSelector_1.ColorSelector(params["selectedColor"], params["setColorCallback"]);
        });
        injector.bindComponent("hyperlinkSelector", function (ctx, params) {
            var permalinkService = ctx.resolve("permalinkService");
            var resourcePickers = ctx.resolve("resourcePickers");
            return new hyperlinkSelector_1.HyperlinkSelector(permalinkService, resourcePickers, params["selectedPermalink"]);
        });
        injector.bindComponent("rowLayoutSelector", function (ctx, params) {
            return new rowLayoutSelector_1.RowLayoutSelector(params["onSelect"]);
        });
        injector.bindComponent("sectionLayoutSelector", function (ctx, params) {
            return new sectionLayoutSelector_1.SectionLayoutSelector(params["onSelect"]);
        });
        injector.bindComponent("widgetSelector", function (ctx, params) {
            var widgetService = ctx.resolve("widgetService");
            return new widgetSelector_1.WidgetSelector(widgetService, params["onSelect"]);
        });
        injector.bindComponent("urlSelector", function (ctx, params) {
            return new urlSelector_1.UrlSelector(params["onSelect"]);
        });
        injector.bind("pageResourcePicker", pageResourcePicker_1.PageResourcePicker);
        injector.bind("mediaResourcePicker", mediaResourcePicker_1.MediaResourcePicker);
        injector.bind("urlResourcePicker", urlResourcePicker_1.UrlResourcePicker);
        injector.bindFactory("resourcePickers", function (ctx) {
            var pageReourcePicker = ctx.resolve("pageResourcePicker");
            var mediaReourcePicker = ctx.resolve("mediaResourcePicker");
            var urlReourcePicker = ctx.resolve("urlResourcePicker");
            return [
                urlReourcePicker,
                pageReourcePicker,
                mediaReourcePicker
            ];
        });
        injector.bindSingleton("dragManager", dragManager_1.DragManager);
        injector.bindSingleton("lightbox", lityLightbox_1.LityLightbox);
        injector.bind("pagePlaceholderWidget", pagePlaceholderViewModel_1.PagePlaceholderViewModel);
        injector.bindSingleton("htmlEditorProvider", htmlEditorProvider_1.HtmlEditorProvider);
        injector.bindSingleton("formattingTools", formattingTools_1.FormattingTools);
        injector.bindSingleton("hyperlinkTools", hyperlinkTools_1.HyperlinkTools);
        injector.bind("layoutEditor", layoutEditor_1.LayoutEditor);
        injector.bind("mapEditor", mapEditor_1.MapEditor);
        injector.bind("textblockEditor", textblockEditor_1.TextblockEditor);
        injector.bind("audioPlayerEditor", audioEditor_1.AudioEditor);
        injector.bind("buttonEditor", buttonEditor_1.ButtonEditor);
        injector.bind("pictureEditor", pictureEditor_1.PictureEditor);
        injector.bind("sectionEditor", sectionEditor_1.SectionEditor);
        injector.bind("columnEditor", columnEditor_1.ColumnEditor);
        injector.bind("navbarEditor", navbarEditor_1.NavbarEditor);
        injector.bind("videoPlayerEditor", videoEditor_1.VideoEditor);
        injector.bind("codeBlockEditor", codeEditor_1.CodeEditor);
    };
    return ComponentRegistrationEditors;
}());
exports.ComponentRegistrationEditors = ComponentRegistrationEditors;
