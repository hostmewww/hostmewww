"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KnockoutRegistrationWidgets = (function () {
    function KnockoutRegistrationWidgets() {
    }
    KnockoutRegistrationWidgets.prototype.register = function (injector) {
        ko.components.register("paper-doc", {
            viewModel: { injectable: "docWidget" },
            template: { fromUrl: "widgets/layout/document.html" },
        });
        ko.components.register("paper-layout", {
            viewModel: { injectable: "layoutWidget" },
            template: { fromUrl: "widgets/layout/layout.html" },
        });
        ko.components.register("paper-page", {
            viewModel: { injectable: "pageWidget" },
            template: { fromUrl: "widgets/page/page.html" },
        });
        ko.components.register("paper-text", {
            template: { fromUrl: "widgets/textblock/textblock.html" },
            viewModel: { injectable: "textblock" },
        });
        ko.components.register("paper-gtm", {
            template: { fromUrl: "widgets/gtm/gtm.html" },
            viewModel: { injectable: "gtm" }
        });
        ko.components.register("paper-intercom", {
            template: { fromUrl: "widgets/intercom/intercom.html" },
            viewModel: { injectable: "intercom" }
        });
        ko.components.register("navbar", {
            template: { fromUrl: "widgets/navbar/navbarTemplate.html" },
            viewModel: { injectable: "navbar" }
        });
        ko.components.register("paper-picture", {
            template: { fromUrl: "widgets/picture/picture.html" },
            viewModel: { injectable: "picture" }
        });
        ko.components.register("paper-button", {
            template: { fromUrl: "widgets/button/button.html" },
            viewModel: { injectable: "button" }
        });
        ko.components.register("paper-audio-player", {
            template: { fromUrl: "widgets/audio-player/audio.html" },
            viewModel: { injectable: "audioPlayer" }
        });
        ko.components.register("paper-youtube-player", {
            template: { fromUrl: "widgets/youtube-player/youtube.html" },
            viewModel: { injectable: "youtubePlayer" }
        });
        ko.components.register("layout-section", {
            template: { fromUrl: "widgets/section/section.html" },
            viewModel: { injectable: "section" },
            postprocess: function (element, viewModel) {
                if (element.nodeName == "#comment") {
                    element = element.nextElementSibling;
                }
                else if (element.nodeName === "DIV") {
                    element = element.firstElementChild;
                }
                ko.applyBindingsToNode(element, {
                    background: viewModel.background,
                    layoutsection: {},
                    css: viewModel.css,
                    snapTo: viewModel.snapTo
                });
            }
        });
        ko.components.register("layout-row", {
            template: { fromUrl: "widgets/row/row.html" },
            viewModel: { injectable: "row" }
        });
        ko.components.register("layout-column", {
            template: { fromUrl: "widgets/column/column.html" },
            viewModel: { injectable: "column" },
            postprocess: function (element, viewModel) {
                if (element.nodeName == "#comment") {
                    element = element.nextElementSibling;
                }
                else if (element.nodeName === "DIV") {
                    element = element.firstElementChild;
                }
                ko.applyBindingsToNode(element, {
                    layoutcolumn: {},
                    css: viewModel.css
                });
            }
        });
        ko.components.register("paper-video-player", {
            template: { fromUrl: "widgets/video-player/video.html" },
            viewModel: { injectable: "videoPlayer" }
        });
        ko.components.register("paper-code", {
            template: { fromUrl: "widgets/codeblock/code.html" },
            viewModel: { injectable: "codeBlock" }
        });
        ko.components.register("follow-us", {
            template: { fromUrl: "widgets/intercom/followUs.html" },
            viewModel: { injectable: "followusBlock" }
        });
    };
    return KnockoutRegistrationWidgets;
}());
exports.KnockoutRegistrationWidgets = KnockoutRegistrationWidgets;
