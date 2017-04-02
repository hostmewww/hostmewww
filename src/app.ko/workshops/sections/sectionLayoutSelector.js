"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sectionModel_1 = require("../../../app/widgets/models/sectionModel");
var SectionLayoutSelector = (function () {
    function SectionLayoutSelector(onSelect) {
        this.selectSectionLayout = this.selectSectionLayout.bind(this);
        this.onResourceSelected = onSelect;
    }
    SectionLayoutSelector.prototype.selectSectionLayout = function (layout) {
        var sectionModel = new sectionModel_1.SectionModel();
        sectionModel.layout = layout;
        if (this.onResourceSelected) {
            this.onResourceSelected(sectionModel);
        }
    };
    return SectionLayoutSelector;
}());
exports.SectionLayoutSelector = SectionLayoutSelector;
