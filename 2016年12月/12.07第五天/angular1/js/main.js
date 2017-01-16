/**
 * Created by Administrator on 2016/12/7 0007.
 */
// require.config(['jquery','angular','angular-route','ng-grid'],function ($,angular) {
//     //这样就可以将ng-grid和angular-route引入，下面的写法就引不进去，但是必须写上shim
// })

require.config({
//     //配置angular的路径
    paths:{
         "jquery":'jquery',
        "angular":"angular",
        'ng-grid':'ng-grid',
        'angular-route':'angular-route'
    },
//     //这个配置是你在引入依赖的时候的包名
    shim:{
        "jquery":{exports:"$"},
        "angular":{
            exports:"angular"
        },
        "angularRoute":{
            exports:"angular-route"
        }


    },
    priority: [
        'jquery',
        'angular',
        // 'app-init',
        // 'mainCtrl'
    ]
})

require(["../../../12.05第三天/angular2/js/app"],function(angular){
    console.log(1)
    // t1.fn()
    // angular.bootstrap(document,["webApp"]);
    // angular.fn()

})