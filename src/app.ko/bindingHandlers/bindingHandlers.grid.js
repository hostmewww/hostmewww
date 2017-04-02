"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rowModel_1 = require("./../../app/widgets/models/rowModel");
var columnModel_1 = require("./../../app/widgets/models/columnModel");
var sectionModel_1 = require("./../../app/widgets/models/sectionModel");
var IViewManager_1 = require("./../../app/ui/IViewManager");
var pagePlaceholderModel_1 = require("../../app/widgets/models/pagePlaceholderModel");
function getParentElementWithModel(element) {
    var parent = element.parentElement;
    if (!parent) {
        return null;
    }
    var model = parent["attachedModel"];
    if (model) {
        return parent;
    }
    return getParentElementWithModel(parent);
}
var GridEditor = (function () {
    function GridEditor(viewManager) {
        this.viewManager = viewManager;
        this.reassignEditors = this.reassignEditors.bind(this);
        document.addEventListener("mousemove", this.onPointerMove.bind(this), true);
        document.addEventListener("scroll", this.onWindowScroll.bind(this));
    }
    GridEditor.prototype.onWindowScroll = function () {
        if (!this.scrolling) {
            this.cleanup();
        }
        this.scrolling = true;
        if (this.scrollTimeout) {
            clearTimeout(this.scrollTimeout);
        }
        this.scrollTimeout = setTimeout(this.resetScrolling.bind(this), 400);
    };
    GridEditor.prototype.resetScrolling = function () {
        this.scrolling = false;
        this.render();
    };
    GridEditor.prototype.render = function () {
        if (this.scrolling || this.viewManager.mode !== IViewManager_1.ViewManagerMode.edit) {
            return;
        }
        var elements;
        var scrollY = window.scrollY | document.documentElement.scrollTop;
        var scrollX = window.scrollX | document.documentElement.scrollLeft;
        var documentX = this.pointerX;
        var documentY = this.pointerY;
        if (document.elementsFromPoint) {
            elements = document.elementsFromPoint(documentX, documentY);
        }
        else if (document.msElementsFromPoint) {
            elements = document.msElementsFromPoint(documentX, documentY);
        }
        else {
            throw "Method \"elementsFromPoint\" not supported by browser.";
        }
        if (elements.length > 0) {
            if (elements.any(function (x) {
                return x.classList.contains("vienna-editor") ||
                    x.classList.contains("vienna-balloon") ||
                    x.nodeName === "BUTTON";
            })) {
                return;
            }
        }
        this.reassignEditors(documentX, documentY, elements);
    };
    GridEditor.prototype.pointerToClientQuadrant = function (pointerX, pointerY, element) {
        var rect = element.getBoundingClientRect();
        var clientX = pointerX - rect.left;
        var clientY = pointerY - rect.top;
        var vertical;
        var horizontal;
        if (clientX > rect.width / 2) {
            horizontal = "right";
        }
        else {
            horizontal = "left";
        }
        if (clientY > rect.height / 2) {
            vertical = "bottom";
        }
        else {
            vertical = "top";
        }
        return { vertical: vertical, horizontal: horizontal };
    };
    GridEditor.prototype.onPointerMove = function (event) {
        this.pointerX = event.clientX;
        this.pointerY = event.clientY;
        this.render();
    };
    GridEditor.prototype.cleanup = function () {
        this.viewManager.clearContextualEditors();
        this.activeColumnElement = null;
        this.activeRowElement = null;
        this.activeSectionElement = null;
        this.activeHighlightedElement = null;
        this.activePagePlaceholderElement = null;
    };
    GridEditor.prototype.getPagePlaceholderContextualEditor = function () {
        var _this = this;
        var pagePlaceholderContextualEditor = {
            element: this.activePagePlaceholderElement,
            position: this.activePagePlaceholderHalf,
            color: "#2b87da",
            addTooltip: "Add section",
            component: {
                name: "section-layout-selector",
                params: {
                    onSelect: function (newSectionModel) {
                        var mainElement = getParentElementWithModel(_this.activePagePlaceholderElement);
                        var mainModel = mainElement["attachedModel"];
                        var mainWidgetModel = mainElement["attachedWidgetModel"];
                        var pagePlaceholderModel = _this.activePagePlaceholderElement["attachedModel"];
                        var index = mainModel.sections.indexOf(pagePlaceholderModel);
                        if (_this.activePagePlaceholderHalf === "bottom") {
                            index++;
                        }
                        mainModel.sections.splice(index, 0, newSectionModel);
                        mainWidgetModel.applyChanges();
                        _this.viewManager.clearContextualEditors();
                    }
                }
            }
        };
        return pagePlaceholderContextualEditor;
    };
    GridEditor.prototype.getSectionContextualEditor = function () {
        var _this = this;
        var sectionContextualEditor = {
            element: this.activeSectionElement,
            position: this.activeSectionHalf,
            color: "#2b87da",
            addTooltip: "Add section",
            component: {
                name: "section-layout-selector",
                params: {
                    onSelect: function (newSectionModel) {
                        var sectionElement = _this.activeSectionElement;
                        var sectionHalf = _this.activeSectionHalf;
                        if (!sectionElement) {
                            sectionElement = _this.activePagePlaceholderElement;
                        }
                        if (!sectionHalf) {
                            sectionHalf = _this.activePagePlaceholderHalf;
                        }
                        var mainElement = getParentElementWithModel(sectionElement);
                        var mainModel = mainElement["attachedModel"];
                        var mainWidgetModel = mainElement["attachedWidgetModel"];
                        var sectionModel = sectionElement["attachedModel"];
                        var index = mainModel.sections.indexOf(sectionModel);
                        if (sectionHalf === "bottom") {
                            index++;
                        }
                        mainModel.sections.splice(index, 0, newSectionModel);
                        mainWidgetModel.applyChanges();
                        _this.viewManager.clearContextualEditors();
                    }
                }
            },
            deleteTooltip: "Delete section",
            deleteCallback: function () {
                var mainElement = getParentElementWithModel(_this.activeSectionElement);
                var mainModel = mainElement["attachedModel"];
                var mainWidgetModel = mainElement["attachedWidgetModel"];
                var sectionModel = _this.activeSectionElement["attachedModel"];
                mainModel.sections.remove(sectionModel);
                mainWidgetModel.applyChanges();
                _this.viewManager.clearContextualEditors();
            },
            settingsTooltip: "Edit section",
            settingsCallback: function () {
                var widgetModel = _this.activeSectionElement["attachedWidgetModel"];
                var editorSession = {
                    component: {
                        name: widgetModel.editor,
                        params: {},
                        oncreate: function (editorViewModel) {
                            editorViewModel.setWidgetModel(widgetModel.model, widgetModel.applyChanges);
                        }
                    },
                    hideCloseButton: widgetModel.hideCloseButton
                };
                _this.viewManager.setWidgetEditor(editorSession);
            }
        };
        return sectionContextualEditor;
    };
    GridEditor.prototype.getEmptySectionContextualEditor = function () {
        var _this = this;
        return {
            element: this.activeSectionElement,
            position: "center",
            color: "#29c4a9",
            addTooltip: "Add row",
            component: {
                name: "row-layout-selector",
                params: {
                    onSelect: function (newRowModel) {
                        var sectionModel = _this.activeSectionElement["attachedModel"];
                        var sectionWidgetModel = _this.activeSectionElement["attachedWidgetModel"];
                        sectionModel.rows.push(newRowModel);
                        sectionWidgetModel.applyChanges();
                        _this.cleanup();
                    }
                }
            }
        };
    };
    GridEditor.prototype.getRowContextualEditor = function () {
        var _this = this;
        var rowContextualEditor = {
            element: this.activeRowElement,
            position: this.activeRowHalf,
            color: "#29c4a9",
            addTooltip: "Add row",
            component: {
                name: "row-layout-selector",
                params: {
                    onSelect: function (newRowModel) {
                        var sectionElement = getParentElementWithModel(_this.activeRowElement);
                        var sectionModel = sectionElement["attachedModel"];
                        var sectionWidgetModel = sectionElement["attachedWidgetModel"];
                        var rowModel = _this.activeRowElement["attachedModel"];
                        var index = sectionModel.rows.indexOf(rowModel);
                        if (_this.activeRowHalf === "bottom") {
                            index++;
                        }
                        sectionModel.rows.splice(index, 0, newRowModel);
                        sectionWidgetModel.applyChanges();
                        _this.cleanup();
                    }
                }
            },
            deleteTooltip: "Delete row",
            deleteCallback: function () {
                var sectionElement = getParentElementWithModel(_this.activeRowElement);
                var sectionModel = sectionElement["attachedModel"];
                var sectionWidgetModel = sectionElement["attachedWidgetModel"];
                var rowModel = _this.activeRowElement["attachedModel"];
                sectionModel.rows.remove(rowModel);
                sectionWidgetModel.applyChanges();
                _this.cleanup();
            }
        };
        return rowContextualEditor;
    };
    GridEditor.prototype.getColumnContextualEditor = function () {
        var _this = this;
        var columnContextualEditor = {
            element: this.activeColumnElement,
            position: "center",
            color: "#4c5866",
            addTooltip: "Add widget",
            component: {
                name: "widget-selector",
                params: {
                    onSelect: function (widgetModel) {
                        var columnModel = _this.activeColumnElement["attachedModel"];
                        var columnWidgetModel = _this.activeColumnElement["attachedWidgetModel"];
                        columnModel.widgets.push(widgetModel);
                        columnWidgetModel.applyChanges();
                        _this.cleanup();
                    }
                }
            },
            settingsTooltip: "Edit column",
            settingsCallback: function () {
                var widgetModel = _this.activeColumnElement["attachedWidgetModel"];
                var editorSession = {
                    component: {
                        name: widgetModel.editor,
                        params: {},
                        oncreate: function (editorViewModel) {
                            editorViewModel.setWidgetModel(widgetModel.model, widgetModel.applyChanges);
                        }
                    },
                    hideCloseButton: widgetModel.hideCloseButton
                };
                _this.viewManager.setWidgetEditor(editorSession);
            }
        };
        return columnContextualEditor;
    };
    GridEditor.prototype.reassignEditors = function (pointerX, pointerY, elements) {
        var highlightedElement = null;
        var highlightedColor = null;
        var pagePlaceholderElement;
        var pagePlaceholderHalf;
        var sectionElement;
        var sectionHalf;
        var rowElement;
        var rowHalf;
        var columnElement;
        for (var i = elements.length - 1; i >= 0; i--) {
            var element = elements[i];
            var attachedModel = element["attachedModel"];
            var attachedWidgetModel = element["attachedWidgetModel"];
            if (attachedWidgetModel && attachedWidgetModel.readonly) {
                continue;
            }
            if (attachedModel) {
                if (attachedModel instanceof pagePlaceholderModel_1.PagePlaceholderModel) {
                    highlightedElement = element;
                    highlightedColor = "#2b87da";
                    pagePlaceholderElement = element;
                    var quadrant = this.pointerToClientQuadrant(pointerX, pointerY, element);
                    pagePlaceholderHalf = quadrant.vertical;
                }
                else if (attachedModel instanceof sectionModel_1.SectionModel) {
                    highlightedElement = element;
                    highlightedColor = "#2b87da";
                    sectionElement = element;
                    var quadrant = this.pointerToClientQuadrant(pointerX, pointerY, element);
                    sectionHalf = quadrant.vertical;
                }
                else if (attachedModel instanceof rowModel_1.RowModel) {
                    highlightedElement = element;
                    highlightedColor = "#29c4a9";
                    rowElement = element;
                    var quadrant = this.pointerToClientQuadrant(pointerX, pointerY, element);
                    rowHalf = quadrant.vertical;
                }
                else if (attachedModel instanceof columnModel_1.ColumnModel) {
                    highlightedElement = element;
                    highlightedColor = "#4c5866";
                    columnElement = element;
                }
            }
        }
        if (columnElement != this.activeColumnElement) {
            this.activeColumnElement = columnElement;
            if (this.activeColumnElement) {
                var attachedModel = this.activeColumnElement["attachedModel"];
                this.viewManager.setContextualEditor("column", this.getColumnContextualEditor());
            }
            else {
                this.viewManager.removeContextualEditor("column");
            }
        }
        if (rowElement != this.activeRowElement || rowHalf != this.activeRowHalf) {
            this.activeRowElement = rowElement;
            this.activeRowHalf = rowHalf;
            this.viewManager.setContextualEditor("row", this.getRowContextualEditor());
        }
        if (sectionElement != this.activeSectionElement || sectionHalf != this.activeSectionHalf) {
            this.activeSectionElement = sectionElement;
            this.activeSectionHalf = sectionHalf;
            this.viewManager.setContextualEditor("section", this.getSectionContextualEditor());
            if (this.activeSectionElement) {
                var attachedModel = this.activeSectionElement["attachedModel"];
                if (attachedModel.rows.length === 0) {
                    this.viewManager.setContextualEditor("row", this.getEmptySectionContextualEditor());
                }
                else {
                    if (!rowElement) {
                        this.viewManager.removeContextualEditor("row");
                    }
                }
            }
            else {
                if (!rowElement) {
                    this.viewManager.removeContextualEditor("row");
                }
            }
        }
        if (pagePlaceholderElement != this.activePagePlaceholderElement || pagePlaceholderHalf != this.activePagePlaceholderHalf) {
            this.activePagePlaceholderElement = pagePlaceholderElement;
            this.activePagePlaceholderHalf = pagePlaceholderHalf;
            this.viewManager.setContextualEditor("page", this.getPagePlaceholderContextualEditor());
        }
        if (this.activeHighlightedElement != highlightedElement) {
            this.activeHighlightedElement = highlightedElement;
            this.viewManager.setHighlight({ element: highlightedElement, color: highlightedColor });
        }
    };
    return GridEditor;
}());
var GridBindingHandler = (function () {
    function GridBindingHandler(layoutEditor, viewManager, pageModelBinder, layoutModelBinder) {
        var gridEditor = new GridEditor(viewManager);
        ko.bindingHandlers["layout-grid"] = {
            init: function (gridElement, valueAccessor) {
                var observer = new MutationObserver(function (mutations) {
                    var options = valueAccessor();
                    if (options.disabled()) {
                        return;
                    }
                    var layoutModel = gridElement["attachedModel"];
                    layoutModelBinder.updateContent(layoutModel);
                });
                observer.observe(gridElement, {
                    attributes: true,
                    childList: true,
                    characterData: true,
                    subtree: true
                });
            }
        };
        ko.bindingHandlers["content-grid"] = {
            init: function (gridElement, valueAccessor) {
                var observer = new MutationObserver(function (mutations) {
                    var parentElement = getParentElementWithModel(gridElement);
                    if (!parentElement) {
                        return;
                    }
                    var model = parentElement["attachedModel"];
                    pageModelBinder.updateContent(model);
                });
                observer.observe(gridElement, {
                    attributes: true,
                    childList: true,
                    characterData: true,
                    subtree: true
                });
            }
        };
        ko.bindingHandlers["layoutsection"] = {
            init: function (sectionElement, valueAccessor) {
            }
        };
        ko.bindingHandlers["layoutrow"] = {
            init: function (rowElement, valueAccessor) {
                layoutEditor.applyBindingsToRow(rowElement);
            }
        };
        ko.bindingHandlers["layoutcolumn"] = {
            init: function (columnElement, valueAccessor) {
                layoutEditor.applyBindingsToColumn(columnElement);
            }
        };
        ko.bindingHandlers["widget"] = {
            init: function (widgetElement, valueAccessor) {
                layoutEditor.applyBindingsToWidget(widgetElement);
            }
        };
    }
    return GridBindingHandler;
}());
exports.GridBindingHandler = GridBindingHandler;
