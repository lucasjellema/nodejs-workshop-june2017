/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/**
 * Example of Require.js boostrap javascript
 */


requirejs.config({
// Path mappings for the logical module names
    paths: 
    //injector:mainReleasePaths
     {
        'knockout': 'libs/knockout/knockout-3.4.0',
        'jquery': 'libs/jquery/jquery-3.1.1.min',
        'jqueryui-amd': 'libs/jquery/jqueryui-amd-1.12.0.min',
        'promise': 'libs/es6-promise/es6-promise.min',
        'ojs': 'libs/oj/v3.0.0/min',
        'ojL10n': 'libs/oj/v3.0.0/ojL10n',
        'ojtranslations': 'libs/oj/v3.0.0/resources',
        'signals': 'libs/js-signals/signals.min',
        'text': 'libs/require/text',
        'hammerjs': 'libs/hammer/hammer-2.0.8.min',
        'moment': 'libs/moment/moment.min',
        'ojdnd': 'libs/dnd-polyfill/dnd-polyfill-1.0.0.min',
        'customElements': 'libs/webcomponents/CustomElements'
    }
    //endinjector
    ,
    // Shim configurations for modules that do not expose AMD
    shim: {
        'jquery': {
            exports: ['jQuery', '$']
        },
        'maps': {
            deps: ['jquery', 'i18n'],
            exports: ['MVMapView']
        }
    },
    // This section configures the i18n plugin. It is merging the Oracle JET built-in translation
    // resources with a custom translation file.
    // Any resource file added, must be placed under a directory named "nls". You can use a path mapping or you can define
    // a path that is relative to the location of this main.js file.
    config: {
        ojL10n: {
            merge: {
                //'ojtranslations/nls/ojtranslations': 'resources/nls/menu'
            }
        }
    }
});
/**
 * A top-level require call executed by the Application.
 * Although 'ojcore' and 'knockout' would be loaded in any case (they are specified as dependencies
 * by the modules themselves), we are listing them explicitly to get the references to the 'oj' and 'ko'
 * objects in the callback
 */
require(['ojs/ojcore',
    'knockout',
    'jquery',
    'utils',
    'ojs/ojrouter',
    'ojs/ojknockout',
    'ojs/ojmodule',
    'ojs/ojbutton',
    'ojs/ojtoolbar',
    'ojs/ojmenu',
    'ojs/ojinputtext'
],
        function (oj, ko, $, utils) {
            var router = oj.Router.rootInstance;
            router.configure({
                'dashboard': {label: 'Dashboard', isDefault: true},
                'people': {label: 'People'},
                'hrm': {label: 'HRM'},
                'organization': {label: 'Organization'},
                'person': {label: 'Person',
                    exit: function () {
                        var childRouter = router.currentState().value;
                        childRouter.dispose();
                    },
                    enter: function () {
                        var childRouter = router.createChildRouter('emp');
                        childRouter.defaultStateId = '100';
                        router.currentState().value = childRouter;
                    }
                }

            });

            function MainViewModel() {
                var self = this;
                self.router = router;
                utils.readSettings();
                self.myPeople = ko.observableArray();
                self.myPerson = ko.observableArray();
                self.ready = ko.observable(false);

                self.optionChangeHandler = function (event, data) {
                    // Only go for user action events
                    if (('ojAppNav' === event.target.id || 'ojAppNav2' === event.target.id) && event.originalEvent) {
                        self.router.go(data.value);
                    }
                };
                self.getHomeURL = function () {
                    var baseURL = window.location.href;
                    var end = baseURL.indexOf('?');
                    var url;
                    if (end !== -1) {
                        url = baseURL.substring(0, end);
                    } else {
                        url = baseURL;
                    }

                    return url;
                };
                self.screenRange = oj.ResponsiveKnockoutUtils.createScreenRangeObservable();
                var lgQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.LG_UP);
                var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
                var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_UP);
                var smOnlyQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
                self.large = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(lgQuery);
                self.medium = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);
                self.small = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
                self.smallOnly = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smOnlyQuery);

                self.dynamicConfig = ko.pureComputed(function () {
                    if (self.smallOnly()) {
                        return {name: 'phone/' + router.moduleConfig.name(), lifecycleListner: router.moduleConfig.lifecycleListner, params: router.moduleConfig.params};
                    }
                    return router.moduleConfig;
                });
            }

            oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();
            oj.Router.sync().then(
                    function () {
                        ko.applyBindings(new MainViewModel(), document.getElementById('globalBody'));
                        $('#globalBody').show();
                    },
                    function (error) {
                        oj.Logger.error('Error in root start: ' + error.message);
                    });
        }
);
