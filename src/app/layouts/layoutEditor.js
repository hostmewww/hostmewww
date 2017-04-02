"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var columnModel_1 = require("./../widgets/models/columnModel");
var rowModel_1 = require("./../widgets/models/rowModel");
var dataTransferTypes_1 = require("../editing/dataTransferTypes");
var timeBeforeStartDragging = 700;
var LayoutEditor = (function () {
    function LayoutEditor(viewManager) {
        this.viewManager = viewManager;
        this.onKeyDown = this.onKeyDown.bind(this);
        this.deleteSelectedWidget = this.deleteSelectedWidget.bind(this);
        this.onNewWidgetDragStart = this.onNewWidgetDragStart.bind(this);
        this.onWidgetDragStart = this.onWidgetDragStart.bind(this);
        this.onWidgetDragEnd = this.onWidgetDragEnd.bind(this);
        this.onAcceptWidgetBeforeRow = this.onAcceptWidgetBeforeRow.bind(this);
        this.onAcceptWidgetAfterRow = this.onAcceptWidgetAfterRow.bind(this);
        this.onAcceptWidgetAfterColumn = this.onAcceptWidgetAfterColumn.bind(this);
        this.onAcceptWidgetBeforeColumn = this.onAcceptWidgetBeforeColumn.bind(this);
        this.onNullPointerMove = this.onNullPointerMove.bind(this);
        this.applyBindingsToWidget = this.applyBindingsToWidget.bind(this);
        this.selectWidget = this.selectWidget.bind(this);
        this.adjustSizes = this.adjustSizes.bind(this);
        this.canAccept = this.canAccept.bind(this);
        document.addEventListener("keydown", this.onKeyDown);
    }
    LayoutEditor.prototype.createPlaceholder = function () {
        this.placeholderElement = $("<div class=\"placeholder\"></div>")[0];
        this.placeholderElement.onmousemove = this.onNullPointerMove;
    };
    LayoutEditor.prototype.createRow = function () {
        return $("<div class=\"row\"></div>")[0];
    };
    LayoutEditor.prototype.createColumn = function () {
        return $("<div></div>")[0];
    };
    LayoutEditor.prototype.removeGridClasses = function (element) {
        $(element)
            .removeClass("col-md-12")
            .removeClass("col-md-11")
            .removeClass("col-md-10")
            .removeClass("col-md-9")
            .removeClass("col-md-8")
            .removeClass("col-md-7")
            .removeClass("col-md-6")
            .removeClass("col-md-5")
            .removeClass("col-md-4")
            .removeClass("col-md-3")
            .removeClass("col-md-2")
            .removeClass("col-md-1");
    };
    LayoutEditor.prototype.deleteSelectedWidget = function () {
        if (!this.selectedWidget || $(this.selectedWidget).find("[contenteditable=true]").length > 0) {
            return;
        }
        var parentRow = this.selectedWidget.parentElement;
        var columnElement = this.selectedWidget.parentElement;
        var sourceColumnModel = columnElement["attachedModel"];
        var rowElement = columnElement.parentElement;
        var sourceRowModel = rowElement["attachedModel"];
        var sourceRowWidgetModel = rowElement["attachedWidgetModel"];
        var sectionElement = rowElement.parentElement.parentElement;
        var sourceSectionModel = sectionElement["attachedModel"];
        var widgetModel = this.selectedWidget["attachedModel"];
        if (sourceColumnModel) {
            sourceColumnModel.widgets.remove(widgetModel);
        }
        sourceRowWidgetModel.applyChanges();
        this.sourceColumnModel = null;
        this.targetColumnModel = null;
        this.clearSelection();
    };
    LayoutEditor.prototype.clearSelection = function () {
        this.selectedWidget = null;
        this.viewManager.setSelectedElement(null);
    };
    LayoutEditor.prototype.relayoutRows = function (rows) {
        var _this = this;
        rows.forEach(function (row) {
            _this.relayoutRow(row);
        });
    };
    LayoutEditor.prototype.relayoutRow = function (rowElement) {
        var _this = this;
        $(rowElement)
            .children()
            .each(function (index, columnElement) {
            var numberOfWidgets = $(columnElement).children().length;
            if (numberOfWidgets === 0) {
                $(columnElement).remove();
            }
        });
        var numberOfColumns = $(rowElement).children().length;
        if (numberOfColumns === 0) {
            $(rowElement).remove();
            return;
        }
        var columnSize = Math.floor(12 / numberOfColumns);
        var columnClass = "col-md-" + (columnSize).toString();
        $(rowElement).children().each(function (index, columnElement) {
            _this.removeGridClasses(columnElement);
            $(columnElement).addClass(columnClass);
        });
    };
    LayoutEditor.prototype.onKeyDown = function (event) {
        if (event.keyCode === 46) {
            this.deleteSelectedWidget();
        }
    };
    LayoutEditor.prototype.onNullPointerMove = function (event) {
        event.stopPropagation();
    };
    LayoutEditor.prototype.onWidgetDragStart = function (payload, widgetElement) {
        this.viewManager.foldEverything();
        this.createPlaceholder();
        var width = widgetElement.clientWidth + "px";
        var height = widgetElement.clientHeight + "px";
        this.placeholderElement.style.width = width;
        this.placeholderElement.style.height = height;
        $(widgetElement).after(this.placeholderElement);
        var columnElement = widgetElement.parentElement;
        this.sourceColumnModel = columnElement["attachedModel"];
        var rowElement = columnElement.parentElement;
        this.sourceRowModel = rowElement["attachedModel"];
        var sectionElement = rowElement.parentElement.parentElement;
        this.sourceSectionModel = sectionElement["attachedModel"];
    };
    LayoutEditor.prototype.onNewWidgetDragStart = function (widgetElement, event) {
        this.viewManager.foldEverything();
        this.createPlaceholder();
        this.clearSelection();
        return true;
    };
    LayoutEditor.prototype.selectWidget = function (widgetElement) {
        this.clearSelection();
        this.selectedWidget = widgetElement;
        var config = {
            element: widgetElement,
            color: "red"
        };
        this.viewManager.setSelectedElement(config);
    };
    LayoutEditor.prototype.adjustSizes = function (widgetElement) {
        var _this = this;
        var placeholderParentColumn = this.placeholderElement.parentElement;
        var placeholderParentRow = placeholderParentColumn.parentElement;
        this.placeholderElement.style.height = placeholderParentRow.clientHeight + "px";
        this.placeholderElement.style.width = placeholderParentColumn.clientWidth + "px";
        widgetElement.style.width = this.placeholderElement.style.width;
        setTimeout(function () {
            if (_this.placeholderElement) {
                _this.placeholderElement.style.height = widgetElement.clientHeight + "px";
            }
        }, timeBeforeStartDragging);
    };
    LayoutEditor.prototype.onAcceptWidgetBeforeRow = function (widgetElement, rowElement) {
        return;
        if (!this.placeholderElement) {
            this.createPlaceholder();
        }
        var placeholderParentColumn = this.placeholderElement.parentElement;
        var placeholderParentRow;
        if (placeholderParentColumn) {
            placeholderParentRow = placeholderParentColumn.parentElement;
            if (rowElement === placeholderParentRow)
                return;
            var newRow = this.createRow();
            newRow.appendChild(placeholderParentColumn);
            $(rowElement).before(newRow);
            this.applyBindingsToRow(newRow);
            this.relayoutRows([placeholderParentRow, rowElement]);
        }
        else {
            var newColumn = this.createColumn();
            newColumn.appendChild(this.placeholderElement);
            this.applyBindingsToColumn(newColumn);
            var newRow = this.createRow();
            newRow.appendChild(newColumn);
            this.applyBindingsToRow(newRow);
            $(rowElement).before(newRow);
            this.relayoutRows([rowElement, newRow]);
        }
        this.adjustSizes(widgetElement);
    };
    LayoutEditor.prototype.onAcceptWidgetAfterRow = function (widgetElement, rowElement) {
        return;
        if (!this.placeholderElement) {
            this.createPlaceholder();
        }
        var placeholderParentColumn = this.placeholderElement.parentElement;
        var placeholderParentRow;
        if (placeholderParentColumn) {
            placeholderParentRow = placeholderParentColumn.parentElement;
            if (rowElement === placeholderParentRow)
                return;
            var newRow = this.createRow();
            newRow.appendChild(placeholderParentColumn);
            $(rowElement).after(newRow);
            this.applyBindingsToRow(newRow);
            this.relayoutRows([placeholderParentRow, rowElement]);
        }
        else {
            var newColumn = this.createColumn();
            newColumn.appendChild(this.placeholderElement);
            this.applyBindingsToColumn(newColumn);
            var newRow = this.createRow();
            newRow.appendChild(newColumn);
            $(rowElement).after(newRow);
            this.applyBindingsToRow(newRow);
            this.relayoutRows([rowElement, newRow]);
        }
        this.adjustSizes(widgetElement);
    };
    LayoutEditor.prototype.onAcceptWidgetBeforeColumn = function (widgetElement, columnElement) {
        if (!this.placeholderElement) {
            this.createPlaceholder();
        }
        var placeholderParentColumn = this.placeholderElement.parentElement;
        if (placeholderParentColumn) {
            var placeholderParentRow = placeholderParentColumn.parentElement;
            if (columnElement.previousSibling === placeholderParentColumn)
                return;
            $(columnElement).before(placeholderParentColumn);
            var columnParentRow = columnElement.parentElement;
            this.relayoutRows([placeholderParentRow, columnParentRow]);
        }
        else {
            placeholderParentColumn = this.createColumn();
            placeholderParentColumn.appendChild(this.placeholderElement);
            this.applyBindingsToColumn(placeholderParentColumn);
            $(columnElement).before(placeholderParentColumn);
            var columnParentRow_1 = columnElement.parentElement;
            this.relayoutRows([columnParentRow_1]);
        }
        this.adjustSizes(widgetElement);
    };
    LayoutEditor.prototype.onAcceptWidgetAfterColumn = function (widgetElement, acceptingColumnElement) {
        if (!this.placeholderElement) {
            this.createPlaceholder();
        }
        var placeholderParentColumn = this.placeholderElement.parentElement;
        if (placeholderParentColumn) {
            var placeholderParentRow = placeholderParentColumn.parentElement;
            if (acceptingColumnElement.nextSibling === placeholderParentColumn)
                return;
            $(acceptingColumnElement).after(placeholderParentColumn);
            var columnParentRow = acceptingColumnElement.parentElement;
            this.relayoutRows([placeholderParentRow, columnParentRow]);
        }
        else {
            placeholderParentColumn = this.createColumn();
            placeholderParentColumn.appendChild(this.placeholderElement);
            this.applyBindingsToColumn(placeholderParentColumn);
            $(acceptingColumnElement).after(placeholderParentColumn);
            var columnParentRow = acceptingColumnElement.parentElement;
            this.relayoutRows([columnParentRow]);
        }
        this.adjustSizes(widgetElement);
    };
    LayoutEditor.prototype.canAccept = function (payload, dragged) {
        return payload === dataTransferTypes_1.DataTransferTypes.widget || payload["widgetOrder"];
    };
    LayoutEditor.prototype.applyBindingsToWidget = function (widgetElement) {
        var _this = this;
        ko.applyBindingsToNode(widgetElement, {
            dragsource: {
                payload: dataTransferTypes_1.DataTransferTypes.widget,
                sticky: true,
                ondragstart: this.onWidgetDragStart,
                ondragend: this.onWidgetDragEnd,
                preventDragging: function () {
                    var attachedWidgetModel = widgetElement["attachedWidgetModel"];
                    return attachedWidgetModel.readonly || $(widgetElement).find("[contenteditable=true]").length > 0;
                }
            },
            click: function () {
                var attachedWidgetModel = widgetElement["attachedWidgetModel"];
                if (attachedWidgetModel.readonly) {
                    return;
                }
                _this.selectWidget(widgetElement);
            }
        });
    };
    LayoutEditor.prototype.applyBindingsToColumn = function (columnElement) {
        ko.applyBindingsToNode(columnElement, {
            dragtarget: {
                flow: "horizontal",
                accept: this.canAccept,
                onacceptbefore: this.onAcceptWidgetBeforeColumn,
                onacceptafter: this.onAcceptWidgetAfterColumn
            }
        });
    };
    LayoutEditor.prototype.setActivePage = function (pageModel) {
        this.selectedPage = pageModel;
    };
    LayoutEditor.prototype.setActiveSection = function (widget) {
        this.selectedSection = widget;
    };
    LayoutEditor.prototype.setActiveRow = function (widget) {
        this.selectedRow = widget;
    };
    LayoutEditor.prototype.setActiveColumn = function (widget) {
        this.selectedColumn = widget;
    };
    LayoutEditor.prototype.addRowToSection = function (sectionWidgetModel) {
        if (this.selectedSection) {
            var sectionModel = this.selectedSection.model;
            sectionModel.rows.push(new rowModel_1.RowModel());
            this.selectedSection.applyChanges();
        }
    };
    LayoutEditor.prototype.addWidget = function (widgetModel) {
        if (this.selectedColumn) {
            var rowModel = this.selectedColumn.model;
            rowModel.widgets.push(widgetModel);
            this.selectedColumn.applyChanges();
        }
    };
    LayoutEditor.prototype.applyBindingsToRow = function (rowElement) {
        ko.applyBindingsToNode(rowElement, {
            dragtarget: {
                flow: "vertical",
                accept: this.canAccept,
                onacceptbefore: this.onAcceptWidgetBeforeRow,
                onacceptafter: this.onAcceptWidgetAfterRow
            }
        });
    };
    LayoutEditor.prototype.onWidgetDragEnd = function (payload, widgetElement) {
        this.viewManager.unfoldEverything();
        if (!this.placeholderElement) {
            $(widgetElement).remove();
            return;
        }
        var placeholderParentColumn = this.placeholderElement.parentElement;
        if (!placeholderParentColumn) {
            this.placeholderElement = null;
            return;
        }
        var placeholderParentRow = placeholderParentColumn.parentElement;
        if (!placeholderParentRow) {
            return;
        }
        if (widgetElement) {
            widgetElement.removeAttribute("style");
            $(this.placeholderElement).after(widgetElement);
        }
        $(this.placeholderElement).remove();
        this.placeholderElement = null;
        var targetColumnElement = placeholderParentColumn;
        var targetRowElement = targetColumnElement.parentElement;
        var targetSectionElement = targetRowElement.parentElement.parentElement;
        var targetRowModel = targetRowElement["attachedModel"];
        var targetColumnElementIndex = [].slice.call(targetRowElement.children).indexOf(targetColumnElement);
        var targetRowElementIndex = [].slice.call(targetSectionElement.children).indexOf(targetRowElement);
        var widgetModel = widgetElement["attachedModel"];
        if (this.sourceColumnModel) {
            var sourceColumnModel = this.sourceColumnModel;
            var sourceRowModel = this.sourceRowModel;
            var sourceSectionModel = this.sourceSectionModel;
            sourceColumnModel.widgets.remove(widgetModel);
            sourceRowModel.columns.remove(sourceColumnModel);
            this.recalculateColumnSizes(sourceRowModel);
            if (sourceRowModel != targetRowModel && sourceRowModel.columns.length === 0) {
                sourceSectionModel.rows.remove(sourceRowModel);
            }
        }
        var targetSectionModel = targetSectionElement["attachedModel"];
        if (!targetRowModel) {
            targetRowModel = new rowModel_1.RowModel();
            targetRowElement["attachedModel"] = targetRowModel;
            targetSectionModel.rows.splice(targetRowElementIndex, 0, targetRowModel);
        }
        var targetColumnModel = new columnModel_1.ColumnModel();
        targetColumnModel.widgets.push(widgetModel);
        targetColumnElement["attachedModel"] = targetColumnModel;
        this.applyBindingsToColumn(targetColumnElement);
        targetRowModel.columns.splice(targetColumnElementIndex, 0, targetColumnModel);
        this.recalculateColumnSizes(targetRowModel);
        this.sourceColumnModel = null;
        this.targetColumnModel = null;
    };
    LayoutEditor.prototype.recalculateColumnSizes = function (rowModel) {
        var numberOfColumns = rowModel.columns.length;
        var columnSize = Math.floor(12 / numberOfColumns);
        rowModel.columns.forEach(function (column) {
            column.sizeMd = columnSize;
        });
    };
    return LayoutEditor;
}());
exports.LayoutEditor = LayoutEditor;
