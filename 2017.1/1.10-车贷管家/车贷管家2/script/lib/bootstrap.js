/**
 * Created by Administrator on 2016/12/7 0007.
 */
define(['require',
    'angular',
    'angular-route',
    'jquery',
    '../dumai/app',
    'router'
],function(require,angular){
    'use strict';
    require(['domReady!'],function(document){
        angular.bootstrap(document,['webapp']);
    });
});