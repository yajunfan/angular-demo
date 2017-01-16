/**
 * Created by Administrator on 2016/12/5 0005.
 */



require.config({
    paths: {
         "jQuery": "jquery",
        "angular" : "angular",
        "angular-route" : "angular-route",
        'ng-gird.debug':'ng-grid.debug'
    },
    shim: {
        'jquery':{
            export:'jquery'
        },
        'angular': {
            exports: 'angular'
        },
        'angular-route':{
            deps: ["angular"],
            exports: 'angular-route'
        },
        'ng-gird.debug':{
            deps:['angular']

        }
    }
});
require(['app2'],function (app2) {

})
// require(['jQuery','angular','angular-route'],function ($,angular){
//     $(function () {
//         angular.bootstrap(document,["myApp"]);//初始化整app
//         console.log(1)
//     })
//     // console.log($('div'))
//     // console.log(angular.version)
// });
