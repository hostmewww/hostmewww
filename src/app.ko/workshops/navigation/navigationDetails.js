"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NavigationDetailsWorkshop = (function () {
    function NavigationDetailsWorkshop(navigationTreeNode, navigationService, viewManager) {
        this.node = navigationTreeNode;
        this.navigationService = navigationService;
        this.viewManager = viewManager;
        this.deleteNavigationItem = this.deleteNavigationItem.bind(this);
        this.openPageSelector = this.openPageSelector.bind(this);
        this.onPageSelected = this.onPageSelected.bind(this);
        this.onUrlChange = this.onUrlChange.bind(this);
        this.node.url.subscribe(this.onUrlChange);
    }
    NavigationDetailsWorkshop.prototype.openPageSelector = function () {
        this.viewManager.itemSelectorName("page-selector");
        var editorSession = {
            component: {
                name: "page-selector",
                params: this.onPageSelected
            },
            hideCloseButton: true
        };
        this.viewManager.setWidgetEditor(editorSession);
    };
    NavigationDetailsWorkshop.prototype.onUrlChange = function (url) {
    };
    NavigationDetailsWorkshop.prototype.onPageSelected = function (permaLink) {
        if (permaLink) {
            this.node.permalinkKey(permaLink.key);
            this.node.url(permaLink.uri);
        }
        else {
            console.error("page is not selected!!!");
        }
        this.viewManager.closeWidgetEditor();
    };
    NavigationDetailsWorkshop.prototype.deleteNavigationItem = function () {
        this.node.remove();
        this.viewManager.closeWorkshop("navigation-details-workshop");
    };
    return NavigationDetailsWorkshop;
}());
exports.NavigationDetailsWorkshop = NavigationDetailsWorkshop;
