"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var columnModel_1 = require("../../../app/widgets/models/columnModel");
var rowModel_1 = require("../../../app/widgets/models/rowModel");
var RowLayoutSelector = (function () {
    function RowLayoutSelector(onSelect) {
        this.rowConfigs = [[12], [6, 6], [4, 4, 4], [3, 3, 3, 3], [8, 4], [4, 8], [3, 9], [9, 3], [6, 3, 3], [3, 3, 6], [3, 6, 3]];
        this.selectRowLayout = this.selectRowLayout.bind(this);
        this.onResourceSelected = onSelect;
    }
    RowLayoutSelector.prototype.selectRowLayout = function (columnSizes) {
        var rowModel = new rowModel_1.RowModel();
        columnSizes.forEach(function (size) {
            var column = new columnModel_1.ColumnModel();
            column.sizeSm = size;
            column.sizeMd = size;
            column.sizeLg = size;
            rowModel.columns.push(column);
        });
        if (this.onResourceSelected) {
            this.onResourceSelected(rowModel);
        }
    };
    return RowLayoutSelector;
}());
exports.RowLayoutSelector = RowLayoutSelector;
