"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GoogleTagManager = (function () {
    function GoogleTagManager(settingsProvider) {
        this.boot = this.boot.bind(this);
        this.onConfigLoaded = this.onConfigLoaded.bind(this);
        settingsProvider.getSettings().then(this.onConfigLoaded);
        this.gtmBootstrapper = ko.observable();
    }
    GoogleTagManager.prototype.onConfigLoaded = function (config) {
        if (!config || !config.gtm) {
            return;
        }
        this.boot(config.gtm);
    };
    GoogleTagManager.prototype.boot = function (gtm) {
        if (gtm.containerId == null) {
            return;
        }
        if (!gtm.dataLayerName) {
            gtm.dataLayerName = 'dataLayer';
        }
        var bootstrapper = "<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','" + gtm.dataLayerName + "','" + gtm.containerId + "');</script><noscript><iframe src='http://www.googletagmanager.com/ns.html?id=" + gtm.containerId + "'  height='0' width='0' style='display:none;visibility:hidden'></iframe> </noscript>";
        this.gtmBootstrapper(bootstrapper);
    };
    return GoogleTagManager;
}());
GoogleTagManager.gtmDataLayerName = 'dataLayer';
exports.GoogleTagManager = GoogleTagManager;
