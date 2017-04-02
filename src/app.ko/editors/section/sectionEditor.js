"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SectionEditor = (function () {
    function SectionEditor() {
        this.setWidgetModel = this.setWidgetModel.bind(this);
        this.onMediaSelected = this.onMediaSelected.bind(this);
        this.clearBackground = this.clearBackground.bind(this);
        this.layout = ko.observable();
        this.layout.subscribe(this.onChange.bind(this));
        this.padding = ko.observable();
        this.padding.subscribe(this.onChange.bind(this));
        this.snap = ko.observable();
        this.snap.subscribe(this.onChange.bind(this));
        this.backgroundSize = ko.observable();
        this.backgroundSize.subscribe(this.onChange.bind(this));
        this.backgroundPosition = ko.observable();
        this.backgroundPosition.subscribe(this.onChange.bind(this));
        this.backgroundColor = ko.observable();
        this.backgroundColor.subscribe(this.onChange.bind(this));
        this.backgroundRepeat = ko.observable();
        this.backgroundRepeat.subscribe(this.onChange.bind(this));
        this.background = ko.observable();
        this.backgroundType = ko.observable();
    }
    SectionEditor.prototype.onChange = function () {
        if (!this.applyChangesCallback) {
            return;
        }
        this.section.layout = this.layout();
        this.section.padding = this.padding();
        this.section.snap = this.snap();
        this.section.backgroundColor = this.backgroundColor();
        this.section.backgroundSize = this.backgroundSize();
        this.section.backgroundPosition = this.backgroundPosition();
        this.applyBackground();
        this.applyChangesCallback();
    };
    SectionEditor.prototype.applyBackground = function () {
        var background = { color: this.section.backgroundColor };
        Object.assign(background, {
            imageUrl: this.section.backgroundPictureUrl,
            position: this.backgroundPosition(),
            repeat: this.backgroundRepeat(),
            size: this.backgroundSize()
        });
        this.background(background);
        this.backgroundType(this.section.backgroundType);
    };
    SectionEditor.prototype.onMediaSelected = function (media) {
        this.section.backgroundSourceKey = media.permalinkKey;
        this.section.backgroundType = "picture";
        this.section.backgroundPictureUrl = media.downloadUrl;
        this.applyBackground();
        this.applyChangesCallback();
    };
    SectionEditor.prototype.clearBackground = function () {
        this.section.backgroundSourceKey = null;
        this.section.backgroundType = "none";
        this.section.backgroundPictureUrl = null;
        this.applyBackground();
        this.applyChangesCallback();
    };
    SectionEditor.prototype.setPictureBackground = function () {
        this.section.backgroundSourceKey = null;
        this.section.backgroundType = "picture";
        this.section.backgroundPictureUrl = null;
        this.applyBackground();
        this.applyChangesCallback();
    };
    SectionEditor.prototype.setWidgetModel = function (section, applyChangesCallback) {
        this.section = section;
        this.layout(this.section.layout);
        this.padding(this.section.padding);
        this.snap(this.section.snap);
        this.backgroundType(this.section.backgroundType);
        this.backgroundSize(this.section.backgroundSize);
        this.backgroundPosition(this.section.backgroundPosition);
        this.backgroundColor(this.section.backgroundColor);
        this.applyBackground();
        this.applyChangesCallback = applyChangesCallback;
    };
    SectionEditor.prototype.comingSoon = function () {
        alert("This feature is coming soon!");
    };
    return SectionEditor;
}());
exports.SectionEditor = SectionEditor;
